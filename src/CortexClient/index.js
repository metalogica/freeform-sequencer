class CortexClient  {
  constructor() {
    this.cortexClientId = process.env.REACT_APP_CORTEX_CLIENT_ID;
    this.cortexClientSecret = process.env.REACT_APP_CORTEX_CLIENT_SECRET;
    this.cortexToken = undefined;
    this.cortexSessionId = undefined;
    this.cortexStream = undefined;

    this.socket = new WebSocket('wss://localhost:6868');
    this.socket.onopen = (event) => {
      setInterval(this.initConnection, 1000);
    };
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message && message.result && message.result.cortexToken) {
        console.log('should store cortex token', event)
        this.cortexToken = message.result.cortexToken;
      } 
      else if (message && message.result && message.result.id) {
        console.log('should store session', event)
        this.cortexSessionId = message.result.id;
      } 
      else if (message && message.result && message.result.success) {
        console.log(event)
        console.log('should store stream', event)
        this.cortexStream = 'mentalCommand';
      }
      else {
        const command = message.com[0];
        const magnitude = message.com[1];
        console.log('command', command, 'magnitude', magnitude);
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
          "headset": "EPOCX-E202014A",
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

    console.log('action', action, 'payload', payload)
    return JSON.stringify(payload)
  }
  
  initConnection = () =>{
    if (this.cortexToken == undefined) {
      console.log('fetching cortex token');
      this.socket.send(this.dispatchPayload('CORTEX_TOKEN'));
    } else if (this.cortexSessionId === undefined) {
      console.log('fetching cortex session');
      this.socket.send(this.dispatchPayload('CORTEX_SESSION'));
    } else if (this.cortexStream === undefined) {
      console.log('fetching cortex stream');
      this.socket.send(this.dispatchPayload('CORTEX_STREAM'));
    }
  }
}

export default CortexClient;
