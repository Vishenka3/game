import React, { Component } from 'react';
import { prepareCanvas } from '../resources/canvas/mainCharacterDrawing'

export class MainCharacter extends Component {
    componentDidMount(){
        prepareCanvas(document.getElementById("mainCharacter"), 150, 220);
    }

    render() {
        return (
            <div id="mainCharacter" className="person mainCharacter">
            </div>
        );
    }
}