import React, { Component } from 'react';
import { connect } from "react-redux";
import { getResults, getPlayerLogin } from "../../selectors/selectors";
import { setDamageDealt, setEnemiesKilled, setTimeSpent, setTasksSolved } from "../../actions/gameActions";

const mapStateToProps = state => ({
    results: getResults(state),
    playerLogin: getPlayerLogin(state),
});

const mapDispatchToProps = {
    setDamageDealt: setDamageDealt,
    setEnemiesKilled: setEnemiesKilled,
    setTimeSpent: setTimeSpent,
    setTasksSolved: setTasksSolved,
};

class ResultWindow extends Component {

    componentWillMount(){
        this.place = this.addToLeaderBoards();
    }

    compare(res1, res2){
        if(res1.enemiesKilled !== res2.enemiesKilled){
            return res1.enemiesKilled - res2.enemiesKilled;
        }else if(res1.tasksSolved !== res2.tasksSolved){
            return res1.tasksSolved - res2.tasksSolved;
        }else if(res1.taskTimeSpent !== res2.taskTimeSpent){
            return res1.taskTimeSpent - res2.taskTimeSpent;
        }else{
            return res1.damageDealt - res2.damageDealt;
        }
    }

    addToLeaderBoards = () => {
        let leaderBoards = [];
        let result = {
            userName: this.props.playerLogin,
            enemiesKilled: this.props.results.enemiesKilled,
            tasksSolved: this.props.results.tasksSolved,
            taskTimeSpent: this.props.results.taskTimeSpent,
            damageDealt: this.props.results.damageDealt,
        };

        if(localStorage.getItem('leaderBoards')){
            leaderBoards = JSON.parse(localStorage.getItem('leaderBoards'));
        }
        leaderBoards.push(result);
        leaderBoards.sort( this.compare );
        if(leaderBoards.length>10){
            leaderBoards.pop();
        }

        let sObj = JSON.stringify(leaderBoards);
        localStorage.setItem('leaderBoards', sObj);
        return leaderBoards.indexOf(result);
    };

    closeResults(){
        let overlay = document.getElementById('overlay');
        overlay.classList.add('hide-modal');
        this.props.setModalType('registration');
    }

    render() {
        return (
            <div id="result-window" className="task-window">
                <h4 className="reg_intro">YOU DIED!</h4>
                <p id="result-text" className="result-text">
                    But don't worry. It's usual thing on this cursed lands.<br/> Some statistic:<br/><br/>
                    &nbsp;&nbsp;&nbsp;Enemies Killed: <em>{this.props.results.enemiesKilled}</em><br/>
                    &nbsp;&nbsp;&nbsp;Damage Dealt: <em>{this.props.results.damageDealt}</em><br/>
                    &nbsp;&nbsp;&nbsp;Tasks Solved: <em>{this.props.results.tasksSolved}</em><br/>
                    &nbsp;&nbsp;&nbsp;Time Spent: <em>{this.props.results.taskTimeSpent}</em> sec<br/><br/>
                    {++this.place ? `U take the ${this.place} place in leaderboards.` : `Unfortunately u don't get into leaderboards :(`}
                    <br/><br/>Press <em>Shift+L</em> to see LeaderBoards<br/>
                </p>
                <div className="button-container modal-button" >
                    <a href="#" id="close-result-button" className="eightbit-btn" onClick={this.closeResults}>Try Again</a>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultWindow);