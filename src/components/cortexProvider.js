import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Menu from './menu';

const dispatchPayload = (action, options) => {
  const payloads = {
    getToken: {
      "id": 1, 
      "jsonrpc": "2.0", 
      "method": "authorize", 
      "params": {
        "clientId": options.cortexClientId, 
        "clientSecret": options.cortexClientSecret,
        "debit": 1 
      },
      "type": "Subscription"
    },
    getSessionId: {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "createSession",
      "params": {
        "cortexToken": options.cortexToken,
        "headset": options.cortexHeadset,
        "status": "open"
      }
    },
    getStream: {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "subscribe",
      "params": {
        "cortexToken": options.MenucortexToken,
        "session": options.MenucortexSessionId,
        "streams": ["com"]
      }
    },
  };

  let payload;

  switch (action) {
    case 'CORTEX_TOKEN':
      payload = payloads.getToken;
      break;
    case 'CORTEX_SESSION':
      payload = payloads.getSessionId;
      payload.cortexToken = options.cortexToken;
      break;
    case 'CORTEX_STREAM':
      payload = payloads.getStream;
      payload.params.cortexToken = options.cortexToken;
      payload.params.session = options.cortexSessionId;
      break;
  }

  // console.log('action', action, 'payload', payload);
  return JSON.stringify(payload)
}

const CortexProvider = () => {
  const socket = new WebSocket('wss://localhost:6868');
  let connectionHandler;

  const dispatch = useDispatch();

  var options = {
    cortexHeadset:  "EPOCX-E202014A",
    cortexClientId: process.env.REACT_APP_CORTEX_CLIENT_ID,
    cortexClientSecret: process.env.REACT_APP_CORTEX_CLIENT_SECRET,
    cortexToken: undefined,
    cortexSessionId: undefined,
    cortexStream: undefined,
    connectionAttempts: 0,
    ready: false
  }

  useEffect(() => {
    socket.onopen = (event) => {
      connectionHandler = setInterval(() => {
        if (options.cortexToken == undefined) {
          // console.log('fetching cortex token');
          socket.send(dispatchPayload('CORTEX_TOKEN', options));
        } else if (options.cortexSessionId === undefined) {
          // console.log('fetching cortex session');
          socket.send(dispatchPayload('CORTEX_SESSION', options));
        } else if (options.cortexStream === undefined) {
          // console.log('fetching cortex stream');
          socket.send(dispatchPayload('CORTEX_STREAM', options));
        }
      
        options.connectionAttempts += 1;
      }, 1000);
    };
    socket.onmessage = (event) => {
      if (options.connectionAttempts >= 5 && options.ready !== true){
        clearInterval(connectionHandler);
        console.error(`
          Unable to establish connection to Cortex API. Please check your keys are correct:\n
          Cortex Client ID: ${options.cortexClientId}\n
          Cortex Client Secret: ${options.cortexClientSecret}\n
          Stage 1/3: Cortex Token: ${options.cortexToken}\n
          Stage 2/3: Cortex Session ID: ${options.cortexSessionId}\n
          Stage 3/3: Cortex Mental Command Stream: ${options.cortexStream}
        `);
      }

      const message = JSON.parse(event.data);

      if (message && message.result && message.result.cortexToken) {
        // console.log('should store cortex token', event);
        options.cortexToken = message.result.cortexToken;
      } 
      else if (message && message.result && message.result.id) {
        // console.log('should store session', event)
        options.cortexSessionId = message.result.id;
      } 
      else if (message && message.result && message.result.success) {
        // console.log('should store stream', event);
        options.cortexStream = 'mentalCommand';
        options.ready = true;
      }
      else if (message && message.com) {
        if (options.ready === false) { 
          console.log('Successfully established connection to Cortex Mental Command Stream.');
          options.ready = true; 
        }
        
        // console.log('command', message.com[0], 'magnitude', message.com[1]);
        dispatch({type: 'COMMAND_STREAM', payload: { kind: message.com[0], magnitude: message.com[1]}});
      }
    }
  });

  // const cortexStream = new CortexClient({dispatch: useDispatch});
  // cortexStream.initConnection();

  return <Menu/>;
}

export default CortexProvider;
