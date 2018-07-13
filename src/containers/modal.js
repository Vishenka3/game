import React, { Component } from 'react';
import { connect } from "react-redux";
import { setModalType } from "../actions/modalActions";

import AuthorizationForm from "../components/modals/authorizaionForm";
import RegistrationForm from "../components/modals/registrationForm";
import EvalWindow from "../components/modals/evalWindow"
import ResultWindow from "../components/modals/resultWindow"
import Leaderboards from "../components/modals/leaderboards"
import TranslateWindow from '../components/modals/translateWindow';
import User from "../resources/User";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = {
    setModalType: setModalType,
};

class Modal extends Component{
    handleClickHref = () => {
        this.props.setModalType('registration');
        User.removeTooltip()
    };

    componentDidMount(){
        this.parent = document.getElementById('app');
        this.modalTarget = document.getElementById('modal');
        this.overlay = document.getElementById('overlay');
        this.modalTarget.style.top = 'calc((100% - ' + window.getComputedStyle(this.modalTarget,null).getPropertyValue("height") + ')/3)';

        if(this.props.modalReducer.modalType === 'spellChoose') {
            this.overlay.addEventListener('click', (e) => {
                if(e.target.id !== 'overlay'){
                    e.preventDefault()
                }else {
                    //ReactDOM.unmountComponentAtNode(this.modalTarget);
                    //ReactDOM.unmountComponentAtNode(this.overlay);
                    this.overlay.removeChild(this.modalTarget);
                    this.parent.removeChild(this.overlay);
                }
            });
        }
    }

    render(){
        return (
            <div id="overlay" className="overlay">
                <div id="modal" className="modal border-8bit">
                    {this.props.modalReducer.modalType === 'registration' ? <RegistrationForm/> :
                        this.props.modalReducer.modalType === 'authorization' ? <AuthorizationForm onClickHref={this.handleClickHref}/> :
                            this.props.modalReducer.modalType === 'evalWindow' ?   <EvalWindow/> :
                                this.props.modalReducer.modalType === 'translateWindow' ?  <TranslateWindow/> :
                                    this.props.modalReducer.modalType === 'resultsWindow' ? <ResultWindow/> :
                                        this.props.modalReducer.modalType === 'leaderboards' ? <Leaderboards/> : ''}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
