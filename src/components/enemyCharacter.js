import React, { Component } from 'react';
import { prepareCanvasEnemy } from '../resources/canvas/enemyCharacterDrawing'

export class EnemyCharacter extends Component {
    componentDidMount(){
        prepareCanvasEnemy(document.getElementById("enemyCharacter"), 220, 220);
    }

    render() {
        return (
            <div id="enemyCharacter" className="person enemyCharacter">
            </div>
        );
    }
}