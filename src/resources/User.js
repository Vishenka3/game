export default class User{

    constructor(){
        this.login = null;
        this.password = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
    }

    static isValid(){
        let form = document.querySelector("#registration-form");
        let valid = false;
        for(let i=0;i<form.elements.length;i++) {
            if (form.elements[i].checkValidity() === false) {
                let target = form.elements[i];
                User.addTooltip(target);
                break;
            } else {
                valid = true;
                User.removeTooltip();
            }
        }
        return valid;
    }


    setUser(obj){
        this.login = obj.login;
        this.password = obj.password;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
    }

    isRegistered(){
        let form = document.querySelector("#authorization-form");
        if(JSON.parse(localStorage.getItem(this.login))){
            let temp = JSON.parse(localStorage.getItem(this.login));
            if(temp.password === this.password){
                this.setUser(temp);
                return true;
            }else{
                User.addTooltip(form.elements[1], 'Wrong password.');
                return false;
            }
        }else{
            console.log('no JSON');
            User.addTooltip(form.elements[0], 'Such login does not exist.');
            return false;
        }
    }

    saveProfile(object){
        this.login = object.login;
        this.password = object.password;
        this.first_name = object.first_name;
        this.last_name = object.last_name;
        this.email = object.email;

        let form = document.querySelector("#registration-form");
        if(JSON.parse(localStorage.getItem(this.login))){
            User.addTooltip(form.elements[0], 'This login is already taken');
            return false;
        }else{
            let sObj = JSON.stringify(this);
            localStorage.setItem(this.login, sObj);
            this.setProfileIcon();
            return true;
        }
    }

    setProfileIcon(){
        let header_button = document.getElementById('header-button');
        let head_profile = document.getElementById('head-profile');
        let profile_name = document.getElementById('profile-name');
        header_button.style.display = 'none';
        head_profile.style.display = 'flex';
        profile_name.innerHTML = 'User:<br>' + this.first_name + ' ' + this.last_name;

    }

    static addTooltip(target, errorText, isSpeech){
        let tooltip = target.getAttribute('data-tooltip');
        let xCorr = 0, yCorr = 0;
        let tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        if(errorText){
            tooltipElem.innerHTML = '<div class="cbbl -right">' + errorText + '</div>';
        }else {
            tooltipElem.innerHTML = '<div class="cbbl -right">' + tooltip + '</div>';
        }
        document.getElementById('app').appendChild(tooltipElem);

        let coords = target.getBoundingClientRect();
        if(isSpeech) {
            xCorr = 70;
            yCorr = 70;
        }

        let left = coords.left + 120 - xCorr + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0;

        let top = coords.top + yCorr - tooltipElem.offsetHeight - 18;
        if (top < 0) {
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';

        //showingTooltip = tooltipElem;
    }

    static removeTooltip() {
        let tooltips = document.getElementsByClassName('cbbl -right');
        for (let i = 0; i < tooltips.length; i++) {
            tooltips[i].remove();
        }
    }
}