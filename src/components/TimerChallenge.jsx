import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

  const timer = useRef();
  const dialog = useRef();

  const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  if (remainingTime <= 0) {
    clearInterval(timer.current);
   
    dialog.current.open();
  }

  function handleStartBtn() {
    timer.current = setInterval(() => {
      setRemainingTime((prevState) => prevState - 10);
    }, 10);
  }

  function handleReset(){
    setRemainingTime(targetTime * 1000);
  }

  function handleStopBtn() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal ref={dialog} remainingTime={remainingTime} targetTime={targetTime} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStopBtn : handleStartBtn}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running ..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
