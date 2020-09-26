class CortexClient  {
  constructor({streamResponse}) {
    this.streamResponse = streamResponse;

    this.socket = new WebSocket('wss://localhost:6868');
    this.cortexHeadset =  "EPOCX-E202014A";
    this.cortexClientId = process.env.REACT_APP_CORTEX_CLIENT_ID;
    this.cortexClientSecret = process.env.REACT_APP_CORTEX_CLIENT_SECRET;
    this.cortexToken = undefined;
    this.cortexSessionId = undefined;
    this.cortexStream = undefined;
    this.connectionAttempts = 0;
    this.ready = false;
  }

  initConnection = () => {
    let connectionHandler;
    
    this.socket.onopen = () => {
      connectionHandler = setInterval(this.attemptConnection, 1000);
    };

    this.socket.onmessage = (event) => {
      if (this.connectionAttempts >= 5 && this.ready !== true){
        clearInterval(connectionHandler);
        console.error(`
          Unable to establish connection to Cortex API. Please check your keys are correct:\n
          Cortex Client ID: ${this.cortexClientId}\n
          Cortex Client Secret: ${this.cortexClientSecret}\n
          Stage 1/3: Cortex Token: ${this.cortexToken}\n
          Stage 2/3: Cortex Session ID: ${this.cortexSessionId}\n
          Stage 3/3: Cortex Mental Command Stream: ${this.cortexStream}
        `);
      }

      const message = JSON.parse(event.data);

      if (message && message.result && message.result.cortexToken) {
        // console.log('should store cortex token', event);
        this.cortexToken = message.result.cortexToken;
      } 
      else if (message && message.result && message.result.id) {
        // console.log('should store session', event)
        this.cortexSessionId = message.result.id;
      } 
      else if (message && message.result && message.result.success) {
        // console.log('should store stream', event);
        this.cortexStream = 'mentalCommand';
        this.ready = true;
      }
      else if (message && message.com) {
        if (this.ready === false) { 
          console.log('Successfully established connection to Cortex Mental Command Stream.');
          this.ready = true; 
        }

        const command = message.com[0];
        const magnitude = message.com[1];

        this.streamResponse({ command: message.com[0], magnitude: message.com[1] });
        // console.log('command', command, 'magnitude', magnitude);
      }
    }
  }

  dispatchPayload = (action) => {
    const payloads = {
      getToken: {
        "id": 1, 
        "jsonrpc": "2.0", 
        "method": "authorize", 
        "params": {
          "clientId": process.env.REACT_APP_CORTEX_CLIENT_ID, 
          "clientSecret": process.env.REACT_APP_CORTEX_CLIENT_SECRET,
          "debit": 1 
        },
        "type": "Subscription"
      },
      getSessionId: {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "createSession",
        "params": {
          "cortexToken": this.cortexToken,
          "headset": this.cortexHeadset,
          "status": "open"
        }
      },
      getStream: {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "subscribe",
        "params": {
          "cortexToken": this.cortexToken,
          "session": this.cortexSessionId,
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
        payload.cortexToken = this.cortexToken;
        break;
      case 'CORTEX_STREAM':
        payload = payloads.getStream;
        payload.params.cortexToken = this.cortexToken;
        payload.params.session = this.cortexSessionId;
        break;
    }

    // console.log('action', action, 'payload', payload);
    return JSON.stringify(payload)
  }
  
  attemptConnection = () => {
    if (this.cortexToken == undefined) {
      // console.log('fetching cortex token');
      this.socket.send(this.dispatchPayload('CORTEX_TOKEN'));
    } else if (this.cortexSessionId === undefined) {
      // console.log('fetching cortex session');
      this.socket.send(this.dispatchPayload('CORTEX_SESSION'));
    } else if (this.cortexStream === undefined) {
      // console.log('fetching cortex stream');
      this.socket.send(this.dispatchPayload('CORTEX_STREAM'));
    }

    this.connectionAttempts += 1;
    // console.log(this.connectionAttempts);
  }
}

export default CortexClient;
