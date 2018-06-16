import React, { Component } from 'react';
import { setModalType } from "../../actions/modalActions";
import { setCurrentUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { blinking } from '../../resources/blinking'
import User from '../../resources/User'

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = {
    setModalType: setModalType,
    setCurrentUser: setCurrentUser,
};

class AuthorizationForm extends Component {
    currentUser = new User();

    authorization = () => {
        //let currentUser = new User();
        let form = document.querySelector("#authorization-form");
        this.currentUser.login = form.elements[0].value;
        this.currentUser.password = form.elements[1].value;
        this.props.setCurrentUser(this.currentUser);
        if(this.currentUser.isRegistered()){
            this.currentUser.setProfileIcon();
            this.overlay.removeChild(this.modalTarget);
            this.parent.removeChild(this.overlay);
        }
    };

    componentDidMount(){
        this.modalTarget = document.getElementById('modal');
        this.overlay = document.getElementById('overlay');
        this.parent = document.getElementById('app');
        blinking('auto');
    }

    render() {
        return (
            <div id="authorization-window" className="authorization-window">
                <h4 className="reg_intro">Who do we have here?</h4>
                <form action="" target="_blank" id="authorization-form" className="registration-form">
                    <div className="input_field">
                        <div className="cmd_for_login">
                            <span/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="login">Login:
                            <input type="text" id="login" name="login" maxLength="20" autoFocus required />
                        </label>
                    </div>
                    <div className="input_field">
                        <div className="cmd_for_login" id="next">
                            <span className="pass_span"/>
                            <span className="hidden_span"/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="password">Password:
                            <input type="password" id="password" name="password" required />
                        </label>
                    </div>
                </form>
                <a href="#" id="registration-link" onClick={this.props.onClickHref}>Registration</a>
                <div className="button-container modal-button" >
                    <a href="#" id="author-button" className="eightbit-btn" onClick={this.authorization}>Log In</a>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationForm);