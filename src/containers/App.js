import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../assets/profile-logo.png';

import '../css/App.scss';
import Modal from "./modal";
import GameField from "./gameField";

const mapStateToProps = state => ({
    ...state
});

class App extends Component {
  render() {
    return (
      <div id="app" className="App">
        <Modal>
        </Modal>
        <header className="App-header">
            <div className="logo"/>
            <div className="page-name"><h1>Mind Games</h1></div>
            <div className="button-container" id="header-button">
                <a href="#self" id="log-in-button" className="eightbit-btn">Log In</a>
            </div>
            <div className="head-profile" id="head-profile">
                <img id="profile-logo" className="profile-logo" alt="profile-logo" src={logo}/>
                <span id="profile-name" className="profile-name"/>
            </div>
        </header>
        <GameField/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
