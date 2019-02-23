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
      toggleOrder: true,
      winnerLine: [-1, -1, -1]
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
        return [squares[a], lines[i]]
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

  handleToggle() {
    this.setState({
      toggleOrder: !this.state.toggleOrder
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

    // history = this.state.toggleOrder ? history : history.reverse()
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

    if (!this.state.toggleOrder) {
      moves.sort((a, b) => b.key - a.key)
    }
    let status;

    // console.log(winner)
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else if (!winner && this.state.stepNumber === 9) {
      status = 'Being a Draw!'
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="">
        <div>
          <Board winner={winner} squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleToggle()}>
            {this.state.toggleOrder ? 'Asc Order' : 'Dec Order'}
          </button>
          <ol >{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
