import React, { Component } from 'react';
import { randomInt, taskTimeout } from "../../containers/gameField";
import { connect } from "react-redux";
import { getTaskAnswer, getTaskTimers, getTaskState, getResults } from "../../selectors/selectors";
import { setTaskAnswer, setTaskState, setTaskTimer } from "../../actions/taskActions";
import { setTimeSpent } from '../../actions/gameActions'

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

class EvalWindow extends Component {
    operations = ['+', '-', '*'];

    componentWillMount(){
        this.operation = this.operations[randomInt(0, 2)];
        this.timeSolved=0;
        if( this.operation === '+' || this.operation === '-') {
            this.first_number = randomInt(-100, 100);
            this.second_number = randomInt(-100, 100);
        }else{
            this.first_number = randomInt(-20, 20);
            this.second_number = randomInt(-10, 10);
        }
    }

    componentDidMount(){
        this.modalTarget = document.getElementById('modal');
        this.overlay = document.getElementById('overlay');
        this.parent = document.getElementById('app');
        console.log(eval(`${this.first_number} ${this.operation} ${this.second_number}`));
        this.interval = setInterval( () => {
            this.props.setTaskTimer(0, --this.props.taskTimer[0]);
        }, 1000);
        setTimeout( () => {
            clearInterval(this.interval);
            this.props.setTaskTimer(0, 15);
            this.props.setTaskState('none');
        }, this.props.taskTimer[0]*1000);
    }

    handleChange = (event) => {
        let answer_field = document.getElementById('answer_field');
        this.props.setTaskAnswer(event.target.value);

        setTimeout( () => {
            if(this.props.taskAnswer == eval(`${this.first_number} ${this.operation} ${this.second_number}`)){
                this.timeSolved = 15-this.props.taskTimer[0];
                this.props.setTimeSpent(this.timeSolved+this.props.results.taskTimeSpent);
                this.props.setTaskState('true');
                answer_field.style.backgroundColor = "#b2ff91";
                //clearInterval(this.interval);
            }else{
                this.props.setTaskState('false');
                answer_field.style.backgroundColor = "#ff706d";

            }
        }, 5);

    };

    render() {
        return (
            <div id="eval-window" className="task-window">
                <h4 className="reg_intro">SOLVE the following task to hit enemy.</h4>
                <p id="eval-field" className="eval-field"><em>{this.first_number}</em> <em>{this.operation}</em> <em>{this.second_number}</em> = ?<br/><br/>Time left: <em>{this.props.taskTimer[0]}</em>
                    <br/>{this.props.taskState === 'true' ? `Task solved in ${this.timeSolved}` : `Type answer here:`}
                </p>
                <input type="text" id="answer_field" value={this.props.taskAnswer} onChange={this.handleChange} autoFocus/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvalWindow);