import React from 'react'

let eventListener = {}

export const useEventCallback = (callback) => {
  const memoizedCallback = React.useCallback(
    (state) => callback(state),
    [],
  );
  return memoizedCallback;
}

export const useEventSubscriber = (event, callback) => {
  // state that tracks if this is the first time the component was created. 
  // Enforces rules where events are not duplicated.
  const [internalState, setInternalState] = React.useState(false);
  
  // Cleans up component after it unmounts. So hanging callbacks don't get called for 
  // components that no longer exist
  React.useLayoutEffect(() => {
    return () => eventListener[event].delete(callback);
  }, []);

  // check if the function has been called previously
  if(!internalState) {
    if(eventListener[event] == undefined) {
      const callbackSet = new Set();
      callbackSet.add(callback);
      eventListener[event] = callbackSet;
    } else {
      eventListener[event].add(callback);
    }
    setInternalState(true);
  }

  return {
    unsubscribe: () => {
      eventListener[event].delete(callback)
      subscriberState.delete(event);
    }
  };
}

export const useEventPublisher = () => {
  return (event, payload) => {
    if(eventListener[event] != undefined) {
      eventListener[event].forEach(cb => {
        console.log(payload);
        cb(payload);
      });
    }
  }
}
