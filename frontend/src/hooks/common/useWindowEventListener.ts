/* eslint-disable no-unused-vars */
// https://usehooks-ts.com/react-hook/use-event-listener
import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

// Window Event based useEventListener interface
function useWindowEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!(window && window.addEventListener)) return;

    // Create event listener that calls handler function stored in ref
    const listener: typeof handler = (event) => savedHandler.current(event);

    window.addEventListener(eventName, listener, options);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

export default useWindowEventListener;
