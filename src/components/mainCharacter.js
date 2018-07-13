import React, { Component } from 'react';
import { prepareCanvasPlayer } from '../resources/canvas/mainCharacterDrawing'

export class MainCharacter extends Component {
    componentDidMount(){
        prepareCanvasPlayer(document.getElementById("mainCharacter"), 220, 220);
    }

    render() {
        return (
            <div id="mainCharacter" className="person mainCharacter">
            </div>
        );
    }
}