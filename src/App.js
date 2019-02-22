import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Board from './components/Board'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      positons: Array(9).fill(null),
      xIsNext: true,
      stepNumber: 0,
      classes: Array(9).fill(null),
    }
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null;
  }

  handleClick = (i) => {
    const positons = this.state.positons.slice();

    const positonsCords = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ]

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'


    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })

    positons[this.state.stepNumber + 1] = positonsCords[i]

    this.setState({
      positons: positons
    })
  }

  jumpTo(step) {
    const classes = Array(9).fill()
    classes[step] = 'bold'

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      classes: classes,
    })
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Positon: (' + this.state.positons[move] + '). Go to move # ' + move :
        'Go to game start'
      // console.log(step)
      return (
        <li key={move}>
          <button className={this.state.classes[move] ? 'move-bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    }

    return (
      <div className="">
        <div>
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
