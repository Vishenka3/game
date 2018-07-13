import React, { Component } from 'react';
import { MainCharacter } from "../components/mainCharacter";
import { EnemyCharacter } from "../components/enemyCharacter";
import { HitArea } from "../components/hitArea";
import { dealDamage, setNewEnemyName, hitPlayer } from '../actions/simpleAction'
import { setTaskAnswer } from "../actions/taskActions";
import { setTimeSpent, setDamageDealt, setEnemiesKilled, setTasksSolved } from '../actions/gameActions'
import {
    getPlayerHealth, getPlayerName, getEnemyHealth, getEnemyMaxHealth, getEnemyName, getSpells,
    getTaskState, getTaskTimers, getResults, getTaskAnswer
} from '../selectors/selectors';
import { setModalType } from "../actions/modalActions";
import { connect } from 'react-redux';


import lightningSound from '../assets/audio/lightning.mp3';
import hadukenSound from '../assets/audio/hadouken.mp3';
import hadukenSwoosh from '../assets/audio/had_swoosh.mp3';
import omaeWa from '../assets/audio/omae wa.mp3';
import nani from '../assets/audio/nani.mp3';

import deadDS from '../assets/audio/died_ds.mp3';
import deadIWBTB from '../assets/audio/lol-youdied.mp3';
import wasted from '../assets/audio/wasted_2.mp3';
import marioDead from '../assets/audio/mario-died.mp3';
import dimon from '../assets/audio/dimon.mp3';
import gameOver from '../assets/audio/gameovr.mp3';

import vsLogo from '../assets/VS.png';
import lightningIcon from '../assets/lightIcon.png';
import hadukenIcon from '../assets/hadouken.png';

import { prepareCanvasEnemy, drawBones, enemyDying, enemyCastSpell } from '../resources/canvas/enemyCharacterDrawing';
import { prepareCanvasPlayer, castSpell, playerDrawBones, playerDying } from '../resources/canvas/mainCharacterDrawing';
import { haduken } from "../resources/canvas/haduken";
import { initLightning, stopLightning } from "../resources/canvas/lightning";
import User from "../resources/User";

const gameOverSound = [deadDS,deadIWBTB,wasted,marioDead,dimon,gameOver];

const names = {
    adjective: ['Smart', 'Ugly', 'Brave', 'Horrible', 'Insane', 'Terrible', 'Tricky', 'Charming', 'Monstrous', 'Cheeky'],
    race: ['ork', 'zombie', 'elf', 'thief', 'breeky'],
    name: ['Jery', 'Tom', 'Sauron', 'Palpatine', 'Hitler', 'Lucius', 'Azmodan', 'Tathamet', 'Mephisto', 'Baal', 'Andariel', 'Belial']
};

const taskTypes = ['evalWindow', 'translateWindow'];

export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export let taskTimeout;

const mapStateToProps = state => ({
    playerHealth: getPlayerHealth(state),
    playerName: getPlayerName(state),
    enemyHealth: getEnemyHealth(state),
    enemyMaxHealth: getEnemyMaxHealth(state),
    enemyName: getEnemyName(state),
    spells: getSpells(state),
    answerState: getTaskState(state),
    taskTimer: getTaskTimers(state),
    results: getResults(state),
});

const mapDispatchToProps = {
    dealDamage: dealDamage,
    hitPlayer: hitPlayer,
    setNewEnemyName: setNewEnemyName,
    setModalType: setModalType,
    setDamageDealt: setDamageDealt,
    setEnemiesKilled: setEnemiesKilled,
    setTimeSpent: setTimeSpent,
    setTasksSolved: setTasksSolved,
    setTaskAnswer: setTaskAnswer,
};

class GameField extends Component {

      componentDidMount(){
          this.target = document.getElementById('haduken-button-link');
          this.target.addEventListener( 'mouseover', () => {
              User.addTooltip(this.target, null, 'spells')
          });
          this.target.addEventListener( 'mouseout', () => {
              User.removeTooltip()
          });

          this.target2 = document.getElementById('light-button-link');
          this.target2.addEventListener( 'mouseover', () => {
              User.addTooltip(this.target2, null, 'spells')
          });
          this.target2.addEventListener( 'mouseout', () => {
              User.removeTooltip()
          });

          document.onkeydown = (e) => {
              e = e || window.event;
              if (e.shiftKey && e.keyCode === 76) {
                  let overlay = document.getElementById('overlay');
                  overlay.classList.remove('hide-modal');
                  this.props.setModalType('leaderboards');
              }
              return true;
          };
      }

      onPlay(track){
          this[track] = new Audio(track);
          this[track].play();
          this[track] = null;
      }

      dealDamage = (event) => {
        let id = event.target.id;
        let damage = 0;

        if(id === 'haduken-button-link'){
            damage = randomInt(this.props.spells.hadouken.bottomDamage,this.props.spells.hadouken.topDamage);
        }else{
            damage = randomInt(this.props.spells.lightning.bottomDamage,this.props.spells.lightning.topDamage);
        }

        let overlay = document.getElementById('overlay');
        overlay.classList.remove('hide-modal');

        let currentTaskNumber = randomInt(0,1);
        this.props.setModalType(taskTypes[currentTaskNumber]);

        taskTimeout = setTimeout( () => {
            overlay.classList.add('hide-modal');
            this.props.setModalType('registration');

            if(this.props.answerState === 'true'){
                this.props.setTaskAnswer('');
                this.props.setTasksSolved(++this.props.results.tasksSolved);
                document.getElementById("lightning").classList.remove('reverse');
                document.getElementById('blockCover').style.display = 'block';
                if(this.props.enemyHealth <= damage) {
                    User.addTooltip(document.getElementById("canvasPlayer"), 'Omae wa mou shindeiru!', 'speech');
                    this.onPlay(omaeWa);
                    setTimeout(() => {
                        User.removeTooltip();
                        this.onPlay(nani);
                        User.addTooltip(document.getElementById("canvasEnemy"), 'Nani?', 'speech');
                    }, 2500);
                    setTimeout(() => {
                        User.removeTooltip();

                        if(id === 'haduken-button-link'){
                            User.addTooltip(document.getElementById("canvasPlayer"), 'HADOUKEN!', 'speech');
                            this.onPlay(hadukenSound);
                            setTimeout( () => {
                                haduken(document.getElementById("lightning"));
                                this.onPlay(hadukenSwoosh);
                                castSpell();
                                User.removeTooltip();
                            }, 1000);

                            setTimeout( () => {
                                drawBones();
                                enemyDying();
                                this.props.setEnemiesKilled(++this.props.results.enemiesKilled);
                                this.props.dealDamage(damage);
                                this.props.setDamageDealt(damage+this.props.results.damageDealt);
                                stopLightning(document.getElementById("lightning"));
                                document.getElementById('blockCover').style.display = 'none';
                                User.removeTooltip();
                            }, 2000);

                            setTimeout( () => {
                                this.enemyRespawn();
                            }, 4500);
                        }else{
                            this.onPlay(lightningSound);
                            initLightning(document.getElementById("lightning"), 40, 200);
                            castSpell();
                            drawBones();
                            enemyDying();
                            this.props.setEnemiesKilled(++this.props.results.enemiesKilled);
                            setTimeout( () => {
                                this.props.dealDamage(damage);
                                this.props.setDamageDealt(damage+this.props.results.damageDealt);
                                stopLightning(document.getElementById("lightning"));
                                document.getElementById('blockCover').style.display = 'none';
                                User.removeTooltip();
                            }, 1500);

                            setTimeout( () => {
                                this.enemyRespawn();
                            }, 2500);
                        }
                    }, 3200);

                }else{
                    if(id === 'haduken-button-link'){
                        User.addTooltip(document.getElementById("canvasPlayer"), 'HADOUKEN!', true);
                        this.onPlay(hadukenSound);
                        setTimeout( () => {
                            castSpell();
                            this.onPlay(hadukenSwoosh);
                            haduken(document.getElementById("lightning"));
                            User.removeTooltip();
                        }, 1200);
                        setTimeout( () => {
                            this.props.dealDamage(damage);
                            this.props.setDamageDealt(damage+this.props.results.damageDealt);
                            drawBones();
                            stopLightning(document.getElementById("lightning"));
                            document.getElementById('blockCover').style.display = 'none';
                            User.removeTooltip();
                        }, 2200);
                    }else{
                        this.onPlay(lightningSound);
                        initLightning(document.getElementById("lightning"), 40, 200);
                        castSpell();
                        drawBones();
                        setTimeout( () => {
                            this.props.dealDamage(damage);
                            this.props.setDamageDealt(damage+this.props.results.damageDealt);
                            stopLightning(document.getElementById("lightning"));
                            document.getElementById('blockCover').style.display = 'none';
                            User.removeTooltip();
                        }, 1500);
                    }
                }
            }else{
                document.getElementById('blockCover').style.display = 'block';
                document.getElementById("lightning").classList.add('reverse');
                if(this.props.playerHealth <= damage) {
                    User.removeTooltip();

                    if(id === 'haduken-button-link'){
                        User.addTooltip(document.getElementById("canvasEnemy"), 'HADOUKEN!', 'speech');
                        this.onPlay(hadukenSound);
                        setTimeout( () => {
                            haduken(document.getElementById("lightning"));
                            enemyCastSpell();
                            this.onPlay(hadukenSwoosh);
                            User.removeTooltip();
                        }, 1000);

                        setTimeout( () => {
                            playerDrawBones();
                            playerDying();
                            this.onPlay(gameOverSound[randomInt(0,5)]);
                            this.props.hitPlayer(damage);
                            stopLightning(document.getElementById("lightning"));
                            document.getElementById('blockCover').style.display = 'none';
                            User.removeTooltip();
                            overlay.classList.remove('hide-modal');
                            this.props.setModalType('resultsWindow');
                        }, 2000);

                        /*setTimeout( () => {
                            this.playerRespawn();
                        }, 7500);*/
                    }else{
                        this.onPlay(lightningSound);
                        initLightning(document.getElementById("lightning"), 40, 200);
                        enemyCastSpell();
                        playerDrawBones();
                        playerDying();

                        setTimeout( () => {
                            this.props.hitPlayer(damage);
                            this.onPlay(gameOverSound[randomInt(0,5)]);
                            stopLightning(document.getElementById("lightning"));
                            document.getElementById('blockCover').style.display = 'none';
                            User.removeTooltip();
                            overlay.classList.remove('hide-modal');
                            this.props.setModalType('resultsWindow');
                        }, 1500);

                        /*setTimeout( () => {
                            this.playerRespawn();
                        }, 5500);*/
                    }
                }else{
                    if(id === 'haduken-button-link'){
                        User.addTooltip(document.getElementById("canvasEnemy"), 'HADOUKEN!', true);
                        this.onPlay(hadukenSound);
                        setTimeout( () => {
                            enemyCastSpell();
                            this.onPlay(hadukenSwoosh);
                            haduken(document.getElementById("lightning"));
                            User.removeTooltip();
                        }, 1200);
                        setTimeout( () => {
                            this.props.hitPlayer(damage);
                            playerDrawBones();
                            stopLightning(document.getElementById("lightning"));
                            document.getElementById('blockCover').style.display = 'none';
                            User.removeTooltip();
                        }, 2200);
                    }else{
                        this.onPlay(lightningSound);
                        initLightning(document.getElementById("lightning"), 40, 200);
                        enemyCastSpell();
                        playerDrawBones();
                        setTimeout( () => {
                            this.props.hitPlayer(damage);
                            stopLightning(document.getElementById("lightning"));
                            document.getElementById('blockCover').style.display = 'none';
                            User.removeTooltip();
                        }, 1500);
                    }
                }
            }

        }, this.props.taskTimer[currentTaskNumber]*1000);
    };

    enemyRespawn = () => {
        let child = document.getElementById('canvasEnemy');
        let parent = document.getElementById('enemyCharacter');
        parent.removeChild(child);
        prepareCanvasEnemy(document.getElementById("enemyCharacter"), 220, 220);
        enemyDying();
        this.props.setNewEnemyName(`${names.adjective[randomInt(null, names.adjective.length)]} ${names.race[randomInt(null, names.race.length)]} ${names.name[randomInt(null, names.name.length)]}`);
    };

    playerRespawn = () => {
        let child = document.getElementById('canvasPlayer');
        let parent = document.getElementById('mainCharacter');
        parent.removeChild(child);
        prepareCanvasPlayer(document.getElementById("mainCharacter"), 220, 220);
        playerDying();
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
                    <div id="spellPanel" className="spellPanel">
                        <div className="button-container" id="light-button" >
                            <a href="#self" id="light-button-link" data-tooltip={`LIGHTNING<br>Damage <em>${this.props.spells.lightning.bottomDamage}</em>-<em>${this.props.spells.lightning.topDamage}</em>`} className="eightbit-btn light" onClick={this.dealDamage}><img src={lightningIcon} height="36" width="36" alt="lightningIcon"/></a>
                        </div>
                        <div className="button-container" id="haduken-button" >
                            <a href="#self" id="haduken-button-link" data-tooltip={`HADOUKEN<br>Damage <em>${this.props.spells.hadouken.bottomDamage}</em>-<em>${this.props.spells.hadouken.topDamage}</em>`} className="eightbit-btn haduken" onClick={this.dealDamage}><img src={hadukenIcon} height="36" width="36" alt="lightningIcon"/></a>
                        </div>
                        <div id="blockCover" className="blockCover"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField);