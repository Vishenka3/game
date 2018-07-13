import React, { Component } from 'react';
import { connect } from "react-redux";
import { getResults, getPlayerLogin } from "../../selectors/selectors";

const mapStateToProps = state => ({
    results: getResults(state),
    playerLogin: getPlayerLogin(state),
});

class Leaderboards extends Component {

    componentWillMount(){
        this.leaderboards = [];
        if(localStorage.getItem('leaderBoards')) {
            this.leaderboards = JSON.parse(localStorage.getItem('leaderBoards'));
        }
        console.log(this.leaderboards);
    }

    closeResults(){
        let overlay = document.getElementById('overlay');
        overlay.classList.add('hide-modal');
        this.props.setModalType('registration');
    }

    render() {
        return (
            <div id="leaderboards-window" className="task-window">
                <h4 className="reg_intro">LeaderBoards</h4>
                <table>
                    <tbody>
                        <tr>
                            <th>№</th>
                            <th>Login</th>
                            <th>Kills</th>
                            <th>Tasks</th>
                            <th>Time</th>
                            <th>Damage</th>
                        </tr>
                        {this.leaderboards.map( (item, i) => {
                            console.log(item);
                            return   (
                                <tr>
                                    <td>{i}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.enemiesKilled}</td>
                                    <td>{item.tasksSolved}</td>
                                    <td>{item.taskTimeSpent}</td>
                                    <td>{item.damageDealt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="button-container modal-button" >
                    <a href="#" id="close-result-button" className="eightbit-btn" onClick={this.closeResults}>OK</a>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Leaderboards);