import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

function Board(squares, onClick) {
  function renderSquare(i) {
    return (
    <Square 
      value={squares[i]}
      onClick={()=>onClick(i)}
    />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
    const[history,setHistory]=useState([Array(9).fill(null)]);
    const[xIsNext,setXIsNext]=useState(true);
    const[stepNumber,setStepNumber]=useState(0);

    function handleClick(i) {
        const newHistory=history.slice(0,stepNumber + 1);
        const current= newHistory[newHistory.length-1];
        const squares=current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
          squares[i]=this.state.xIsNext?'X':'O';
        setHistory(newHistory.concat([{
            squares:squares
          }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    function renderGame() {
        const current= history[stepNumber];
        const winner=calculateWinner(current.squares);    

        history.map((step,move) => {
            const desc=move?'Go to move ' + move : 'Go to Game Start';
        let status;
        if(winner) {
          status='Winner: '+winner;
        }
        else {
          status = 'Next player:' + (xIsNext?'X':'O');
        }
  
        return (
          <div>
            <li key={move}>
              <button onClick={()=>jumpTo(move)}>
                {desc}
              </button>
            </li>
            <p>{status}</p>
          </div>

          );
      });
    }
          return (
            <div className="game">
              <div className="game-board">
                <Board 
                  squares={history[stepNumber]}
                  onClick={(i)=> handleClick(i)}
                />
              </div>
              <div className="game-info">
                <div>{renderGame()}</div>
              </div>
            </div>
          );
        
    
    
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}