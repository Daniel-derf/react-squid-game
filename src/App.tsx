import { useState, useRef } from "react";
import "./App.css";

const containerStyle = { display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5%" };
const buttonStyle = { padding: "8px", borderRadius: "5px", backgroundColor: "black", color: "white" };
const redSquareStyle = { padding: "40px", backgroundColor: "red" };
const greenSquareStyle = { padding: "40px", backgroundColor: "green" };
const scoreStyle = {};

function GreenLightRedLight() {
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isButtonGreen, setIsButtonGreen] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const timer: any = useRef(null);

  const squareStyle = isButtonGreen ? greenSquareStyle : redSquareStyle;

  function finishGame(result: any) {
    result === "win" ? setIsGameWon(true) : setIsGameOver(true);
    setIsGameStarted(false);
    setClicks(0);
  }

  function changeSquareColor() {
    const randomTime = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    setTimeout(() => {
      setIsButtonGreen((prevIsButtonGreen) => !prevIsButtonGreen);

      if (timeLeft > 0 && isGameStarted) {
        changeSquareColor();
      }
    }, randomTime);
  }

  function clearTimer() {
    clearInterval(timer.current);
    timer.current = null;
  }

  function startGame() {
    setIsGameStarted(true);
    setTimeLeft(15);

    if (isGameOver) {
      setScore(0);
      setIsGameOver(false);
    }

    if (isGameWon) {
      setIsGameWon(false);
    }

    timer.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft - 1 === 0) {
          finishGame("lost");
          clearTimer();
        }

        return timeLeft - 1;
      });
    }, 1000);

    // changeSquareColor();
  }

  function computeClick() {
    if (!isButtonGreen) {
      setIsGameOver(true);
      setIsGameStarted(false);
      return;
    }

    setClicks((prevClicks) => {
      if (prevClicks + 1 >= 15) {
        finishGame("win");

        setScore((prevScore) => prevScore + 1);

        clearTimer();

        return;
      }

      return prevClicks + 1;
    });
  }

  return (
    <div style={containerStyle}>
      {!isGameStarted && (
        <button style={buttonStyle} onClick={startGame}>
          Start Game
        </button>
      )}
      {isGameStarted && <span>{`Time left: ${timeLeft}`}</span>}
      <h1 style={scoreStyle}>{`Score: ${score}`}</h1>
      {isGameStarted && <div style={squareStyle} onClick={computeClick}></div>}
      {isGameOver && <h2>Game over!</h2>}
      {isGameWon && <h2>You win!</h2>}
    </div>
  );
}

function App() {
  return (
    <>
      <GreenLightRedLight />
    </>
  );
}

export default App;
