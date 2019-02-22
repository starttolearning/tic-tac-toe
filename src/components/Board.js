import React, { Component } from 'react'
import Square from './Square'


export default class Board extends Component {

    renderSquare = (i) => {
        return <Square
            value={this.props.squares[i]}
            key={i}
            onClick={() => this.props.onClick(i)}
        />
    }


    render() {
        const arrayWith = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];

        const renderSqueres = arrayWith.map((innerArray, index) => {
            let groupSquare = [];
            innerArray.map((value, index) => {
                groupSquare.push(this.renderSquare(value))
            })
            return <div key={index} className="col-one">{groupSquare}</div>
        })

        return (
            <div>
                <div className="board">
                    {renderSqueres}
                </div>
            </div>
        )
    }
}