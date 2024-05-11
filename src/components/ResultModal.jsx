import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, onReset },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const timeInterval = (remainingTime/1000).toFixed(2)
  const result = Math.round((1-remainingTime/(targetTime * 1000))*100);

  return createPortal(
    
      <dialog ref={dialog} className="result-modal">
        {remainingTime<=0 ? <h2>You lost</h2> : <h2>Your result: {result}</h2> }
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with <strong>{timeInterval} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>, document.getElementById('modal')
    
  );
});

export default ResultModal;
