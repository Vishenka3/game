import React, { Component } from 'react';
import { MainCharacter } from "../components/mainCharacter";
import { EnemyCharacter } from "../components/enemyCharacter";
import { HitArea } from "../components/hitArea";
import { dealDamage } from '../actions/simpleAction'
import { getPlayerHealth, getPlayerName, getEnemyHealth, getEnemyMaxHealth, getEnemyName } from '../selectors/selectors';
import { connect } from 'react-redux';


import lightningSound from '../assets/audio/lightning.mp3';
import omaeWa from '../assets/audio/omae wa.mp3';
import nani from '../assets/audio/nani.mp3';
import maslina from '../assets/audio/maslina.mp3';

import vsLogo from '../assets/VS.png';
import { drawBones, enemyDying } from '../resources/canvas/enemyCharacterDrawing';
import { castSpell } from '../resources/canvas/mainCharacterDrawing';
import { initLightning, stopLightning } from "../resources/canvas/lightning";
import User from "../resources/User";

const mapStateToProps = state => ({
    playerHealth: getPlayerHealth(state),
    playerName: getPlayerName(state),
    enemyHealth: getEnemyHealth(state),
    enemyMaxHealth: getEnemyMaxHealth(state),
    enemyName: getEnemyName(state),
});

const mapDispatchToProps = {
    dealDamage: dealDamage,
};

class GameField extends Component {
      dealDamage = (event) => {
        if(this.props.enemyHealth === 0){
            alert('LOL U DIED1');
        }else {
            document.getElementById('blockCover').style.display = 'block';

            if(this.props.enemyHealth <= 90) {
                User.addTooltip(document.getElementById("canvasPlayer"), 'Omae wa mou shindeiru!', true);
                this.omaeWa = new Audio(omaeWa);
                this.omaeWa.play();
                this.omaeWa = null;
                setTimeout(() => {
                    User.removeTooltip();
                    this.nani = new Audio(nani);
                    this.nani.play();
                    this.nani = null;
                    User.addTooltip(document.getElementById("canvasEnemy"), 'Nani?', true);
                }, 2500);
                setTimeout(() => {
                    this.props.dealDamage(90);

                    this.lightSound = new Audio(lightningSound);
                    this.lightSound.play();
                    this.lightSound = null;

                    User.removeTooltip();
                    initLightning(document.getElementById("lightning"), 40, 200);
                    castSpell();
                    drawBones();
                    enemyDying();
                }, 3200);
                setTimeout( () => {
                    stopLightning(document.getElementById("lightning"));
                    document.getElementById('blockCover').style.display = 'none';
                    User.removeTooltip();
                }, 4500);
            }else{
                this.props.dealDamage(90);
                this.lightSound = new Audio(lightningSound);
                this.lightSound.play();
                this.lightSound = null;
                initLightning(document.getElementById("lightning"), 40, 200);
                castSpell();
                drawBones();

                setTimeout( () => {
                    stopLightning(document.getElementById("lightning"));
                    document.getElementById('blockCover').style.display = 'none';
                    User.removeTooltip();
                }, 1500);
            }
        }
    };

    render() {
        return (
            <div id="gameField" className="gameField">
                <section id="infoBar" className="infoBar">
                    <div id="playerInfoBar" className="playerInfoBar">
                        <p id="playerHealthText" className="playerHealthText">{this.props.playerName}</p>
                        <progress id="playerHealthBar" className="playerHealthBar border-bar-8bit" max="100" value={this.props.playerHealth} />
                        <p id="playerHealthText" className="playerHealthText">{this.props.playerHealth}/100</p>
                    </div>
                    <img src={vsLogo} className="vs-logo" id="vs-logo" alt="versus"/>
                    <div id="enemyInfoBar" className="enemyInfoBar">
                        <p id="enemyHealthText" className="enemyHealthText">{this.props.enemyName}</p>
                        <progress id="enemyHealthBar" className="enemyHealthBar border-bar-8bit" max={this.props.enemyMaxHealth} value={this.props.enemyHealth} />
                        <p id="enemyHealthText" className="enemyHealthText">{this.props.enemyHealth}/{this.props.enemyMaxHealth}</p>
                    </div>
                </section>
                <div id="battleField" className="battle-field">
                    <MainCharacter/>
                    <HitArea/>
                    <EnemyCharacter/>
                </div>
                <div className="ground">
                    <div className="button-container" id="hit-button" >
                        <a href="#self" id="hit-button-link" className="eightbit-btn" onClick={this.dealDamage}>HIT</a>
                        <div id="blockCover" className="blockCover"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField);