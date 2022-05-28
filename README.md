# use-event-emitter-hook

> react hook that allows for events to be passed between components

[![NPM](https://img.shields.io/npm/v/use-event-listener.svg)](https://www.npmjs.com/package/use-event-emitter-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-event-emitter-hook
```
## Goal

The goal of this library is to provide an easy to use and lightweight interface for dealing with the issue of event emitters in the context of React.

## Usage

Using the package is very simple and two functions are exposed; `userEventSubscriber` allows for the subscription to an event. One is required for each event you plan to subscribe to. The `useEventPublisher` will publish and event with the option of a payload. All subscribers will be called back to for that event and payload. 

Internally the library caches function calls and for each render will recreate the event tree to point to the new function instance.

```jsx
import React, { Fragment } from 'react'

import { useEventSubscriber, useEventPublisher } from 'use-event-emitter-hook'

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
```

## Future Development

- Test Suite
- Allow for Events to be routed to specific functions
- Allow for precached functions to boost performance
- Add typescript support

## License

MIT © [jeremyheaton](https://github.com/jeremyheaton)
