import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarte] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();
  const dialog  = useRef();

  function handleStartBtn() {
   timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open();
    }, targetTime * 1000);
    
    setTimerStarte(true);
    
  }

  function handleStopBtn(){
    clearTimeout(timer.current)
  }

  return (
    <>
    <ResultModal ref={dialog} result='lost' targetTime={targetTime}/>
    <section className="challenge">
      <h2>{title}</h2>
      
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timer.current ? handleStopBtn : handleStartBtn}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        
        {timerStarted ? "Time is running ..." : "Timer Inactive"}
      </p>
    </section>
    </>
  );
}
