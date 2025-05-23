import { useEffect, useRef } from "react";

function useOutSideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // if I click on the button, that event will bubble up all the way through the DOM
        // until it also reaches that modal window, and so then the click is basically detected
        // outside the modal window, which will immediately close that window again,

        if (ref.current && !ref.current.contains(e.target)) {
          // false, ref.current.contains(e.target)
          // console.log(ref.current);
          // console.log(e.target);
          // console.log(e.target.contains(ref.current)); // true
          handler();
        }
      }

      // to fix this need to listen to capturing phase,
      // change the default behavior of event
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useOutSideClick;
