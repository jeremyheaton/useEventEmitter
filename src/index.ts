import React from 'react'
import { v4 as uuidv4 } from 'uuid';

<<<<<<< HEAD
let eventListener = new Map()
let eventCallbackCache = new Map();
export const useEventSubscriber = (event: string, callback: (param?: any) => void) => {
=======
const eventListener = new Map()
const eventCallbackCache = new Map();
export const useEventSubscriber = (event, callback) => {
>>>>>>> 62c02c7c1eb89976806a57724b22651295f9bd73
  // state that tracks if this is the first time the component was created. 
  // Enforces rules where events are not duplicated.
  const [componentId, setComponentId] = React.useState(uuidv4());

  // Cleans up component after it unmounts. So hanging callbacks don't get called for 
  // components that no longer exist
  React.useEffect(() => {
    return () => {
      eventListener.get(event).delete(eventCallbackCache.get(componentId));
      eventCallbackCache.delete(componentId);
    }
  }, []);

  // Check if the function has been called previously
  if(!eventCallbackCache.has(componentId)) {
    if(!eventListener.has(event)) {
      const callbackSet = new Set();
      callbackSet.add(callback);
      eventListener.set(event, callbackSet)
    } else {
      eventListener.get(event).add(callback);
    }
    eventCallbackCache.set(componentId, callback);
  } else {
    eventListener.get(event).delete(eventCallbackCache.get(componentId));
    eventListener.get(event).add(callback);
    eventCallbackCache.set(componentId, callback);
  }

  return {
    unsubscribe: () => {
      eventListener[event].delete(callback);
      eventCallbackCache.delete(componentId);
    }
  };
}

export const useEventPublisher = () => {
  return (event: string, payload?: any) => {
    if(eventListener.get(event) != undefined) {
      eventListener.get(event).forEach(cb => {
        cb(payload);
      });
    }
  }
}
