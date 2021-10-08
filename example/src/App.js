import React, { Fragment } from 'react'

import { useEventSubscriber, useEventCallback, useEventPublisher } from 'use-event-listener'

const App = () => {
  let [testState, setTestState] = React.useState(0);
  let subscriberFunction = useEventCallback((state) => {
    console.log(state);
    setTestState(state + 1);
  });
  let subscriber = useEventSubscriber("test", subscriberFunction);
  
  return <Fragment>
      <h1> {testState} </h1>
      <Child/>
    </Fragment>
}

const Child = () => {
  let [testState, setTestState] = React.useState(0);
  let publisher = useEventPublisher();

  let testFunction = () => {
    publisher("test", testState)
    setTestState(testState+1);
  }
  return <h1 onClick={testFunction} > {testState} </h1>
}
export default App
