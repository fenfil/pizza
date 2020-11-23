import { useEffect, EffectCallback, MutableRefObject } from "react";

function useOutsideClick(ref: MutableRefObject<any>, callback: EffectCallback) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default useOutsideClick;
