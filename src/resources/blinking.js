export const blinking = function(win_type) {

    let cursorBlink;
    let cmd;
    let cursor;
    let inputElem;
    let targ_form;
    let hidden_pass;

    function moveTargetElement(){
        cursor = cmd.lastElementChild;
        inputElem = cmd.nextElementSibling.firstElementChild;
        inputElem.focus();

        clearInterval(cursorBlink);

        cursorBlink = window.setInterval( () => {
            if (cursor.style.visibility === 'visible') {
                cursor.style.visibility = 'hidden';
            } else {
                cursor.style.visibility = 'visible';
            }
        }, 400);

        inputElem.onkeyup = (event) => {
            //console.log(inputElem.value);
            if ((inputElem.id === 'reg_password' || inputElem.id === 'password') && ((event.keyCode > 46 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 95 && event.keyCode < 106) || (event.keyCode === 161) || (event.keyCode > 95 && event.keyCode < 106) || (event.keyCode > 162 && event.keyCode < 170))){
                hidden_pass.innerHTML+='*';
            }else if((inputElem.id === 'reg_password' || inputElem.id === 'password') && (event.keyCode === 8)){
                hidden_pass.innerHTML = hidden_pass.innerHTML.substr(0, hidden_pass.innerHTML.length-1);
            }
            cmd.firstElementChild.innerHTML = inputElem.value;
        };

        inputElem.onblur = () => {
            clearInterval(cursorBlink);
            cursor.style.visibility = 'hidden';
        };
    }

    cmd = document.getElementsByClassName('cmd_for_login')[0];
    cursor = document.getElementsByClassName('cursor')[0];
    inputElem = document.getElementById(win_type === 'auto' ? 'login' : 'reg_login');
    hidden_pass = document.getElementsByClassName('hidden_span')[0];
    targ_form = document.getElementById(win_type === 'auto' ? 'authorization-form' : 'registration-form');

    inputElem.focus();

    targ_form.onkeyup = (event) =>{
        if(event.keyCode === 9){
            cmd = cmd.parentNode.nextElementSibling.firstElementChild;
            moveTargetElement();
        }
    };

    targ_form.addEventListener('click', (event) =>{
        let target = event.target;
        while (target !== targ_form) {
            if (target.classList == 'input_field') {
                cmd = target.firstElementChild;
                moveTargetElement();
                return;
            }
            target = target.parentNode;
        }
    });

    cursorBlink = window.setInterval( () => {
        if (cursor.style.visibility === 'visible') {
            //console.log('blinkau');
            cursor.style.visibility = 'hidden';
        } else {
            cursor.style.visibility = 'visible';
        }
    }, 400);

    inputElem.onkeyup = () => {
        //console.log(inputElem.value);
        cmd.firstElementChild.innerHTML = inputElem.value;
    };

    inputElem.onblur = () => {
        clearInterval(cursorBlink);
        cursor.style.visibility = 'hidden';
    };
};