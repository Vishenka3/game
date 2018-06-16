import React, { Component } from 'react';
import {blinking} from "../../resources/blinking";
import User from "../../resources/User";

export default class RegistrationForm extends Component {
    currentUser = new User();

    registration = () => {
        console.log('registration');
        if(User.isValid()){
            let profile = {};
            let form = document.querySelector("#registration-form");
            profile.login = form.elements[0].value;
            profile.password = form.elements[1].value;
            profile.first_name = form.elements[2].value;
            profile.last_name = form.elements[3].value;
            profile.email = form.elements[4].value;
            if(this.currentUser.saveProfile(profile)){
                this.overlay.removeChild(this.modalTarget);
                this.parent.removeChild(this.overlay);
            }
        }
    };


    componentDidMount(){
        //console.log(this.props.modalReducer.modalType === 0);
        this.modalTarget = document.getElementById('modal');
        this.overlay = document.getElementById('overlay');
        this.parent = document.getElementById('app');
        blinking();
    }

    render() {
        return (
            <div id="registration-window" className="registration-window">
                <h4 className="reg_intro">Let me know something about u...</h4>
                <form action="" target="_blank" id="registration-form" className="registration-form">
                    <div className="input_field">
                        <div className="cmd_for_login">
                            <span/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="reg_login">Login:
                            <input type="text" id="reg_login" name="reg_login" maxLength="20"
                                   data-tooltip="Check your login." autoFocus required />
                        </label>
                    </div>
                    <div className="input_field">
                        <div className="cmd_for_login">
                            <span className="pass_span"/>
                            <span className="hidden_span" id="1"/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="reg_password">Password:
                            <input type="password" id="reg_password" name="reg_password" maxLength="20"
                                   data-tooltip="Check your password." required />
                        </label>
                    </div>
                    <div className="input_field">
                        <div className="cmd_for_login">
                            <span/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="firstname">First Name:
                            <input type="text" id="firstname" name="firstname" maxLength="20"
                                   data-tooltip="Check your first name." required />
                        </label>
                    </div>
                    <div className="input_field">
                        <div className="cmd_for_login">
                            <span/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="lastname">Last Name:
                            <input type="text" id="lastname" name="lastname" maxLength="20"
                                   data-tooltip="Check your last name." required />
                        </label>
                    </div>
                    <div className="input_field">
                        <div className="cmd_for_login">
                            <span/>
                            <div className="cursor"/>
                        </div>
                        <label htmlFor="email">Email:
                            <input type="email" id="email" name="email" maxLength="20" data-tooltip="Check your Email." required />
                        </label>
                    </div>
                </form>
                <div className="button-container modal-button">
                    <a href="#" id="reg-button" className="eightbit-btn" onClick={this.registration}>Log In</a>
                </div>
            </div>
        );
    }
}