import React, { Fragment } from 'react'

import { useEventSubscriber, useEventPublisher } from 'use-event-listener'

const App = () => {
  let [testState, setTestState] = React.useState(0);

  let subscriber = useEventSubscriber("test", () => depth1());
  
  let depth1 = () => {
    depth2();
  }

  let depth2 = () => {
    setTestState(testState + 1);
  }

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
