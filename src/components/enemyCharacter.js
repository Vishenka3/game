import React, { Component } from 'react';
import { prepareCanvas } from '../resources/canvas/enemyCharacterDrawing'

export class EnemyCharacter extends Component {
    componentDidMount(){
        prepareCanvas(document.getElementById("enemyCharacter"), 220, 220);
    }

    render() {
        return (
            <div id="enemyCharacter" className="person enemyCharacter">
            </div>
        );
    }
}