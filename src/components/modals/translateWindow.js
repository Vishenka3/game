import React, { Component } from 'react';
import { randomInt, taskTimeout } from "../../containers/gameField";
import { connect } from "react-redux";
import { getTaskAnswer, getTaskTimers, getTaskState, getResults } from "../../selectors/selectors";
import { setTaskAnswer, setTaskState, setTaskTimer } from "../../actions/taskActions";
import { setTimeSpent } from '../../actions/gameActions'

import myjsonstring from '../../assets/data/words'

const mapStateToProps = state => ({
    taskAnswer: getTaskAnswer(state),
    taskTimer: getTaskTimers(state),
    taskState: getTaskState(state),
    results: getResults(state),
});

const mapDispatchToProps = {
    setTaskAnswer: setTaskAnswer,
    setTaskState: setTaskState,
    setTaskTimer: setTaskTimer,
    setTimeSpent: setTimeSpent,
};

class TranslateWindow extends Component {

    componentWillMount(){
        this.number = randomInt(0, myjsonstring.length-1);
        this.EN_Word = myjsonstring[this.number].EN;
        this.RU_Word = myjsonstring[this.number].RU;
        this.timeSolved=0;
    }

    componentDidMount(){
        this.modalTarget = document.getElementById('modal');
        this.overlay = document.getElementById('overlay');
        this.parent = document.getElementById('app');
        this.interval = setInterval( () => {
            this.props.setTaskTimer(1, --this.props.taskTimer[1]);
            //this.timeSolved++;
        }, 1000);
        setTimeout( () => {
            clearInterval(this.interval);
            this.props.setTaskTimer(1, 10);
            this.props.setTaskState('none');
        }, this.props.taskTimer[1]*1000);
    }

    handleChange = (event) => {
        let answer_field = document.getElementById('trans_answer_field');
        this.props.setTaskAnswer(event.target.value);

        setTimeout( () => {
            if(this.props.taskAnswer === this.RU_Word){
                this.timeSolved = 10-this.props.taskTimer[1];
                this.props.setTimeSpent(this.timeSolved+this.props.results.taskTimeSpent);
                this.props.setTaskState('true');
                answer_field.style.backgroundColor = "#b2ff91";
                //;
            }else{
                this.props.setTaskState('false');
                answer_field.style.backgroundColor = "#ff706d";
            }
        }, 1);

    };

    render() {
        return (
            <div id="translate-window" className="task-window">
                <h4 className="reg_intro">TRANSLATE following word to Russian to cast spell.</h4>
                <p id="translate-field" className="translate-field"><em>{this.EN_Word}</em> = ?<br/><br/>Time left: <em>{this.props.taskTimer[1]}</em>
                    <br/>{this.props.taskState === 'true' ? `Task solved in ${this.timeSolved}` : `Type answer here:`}
                </p>
                <input type="text" id="trans_answer_field" value={this.props.taskAnswer} onChange={this.handleChange} autoFocus/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslateWindow);