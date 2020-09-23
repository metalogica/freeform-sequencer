class CortexClient  {
  constructor() {
    this.cortexClientId = process.env.REACT_APP_CORTEX_CLIENT_ID;
    this.cortexClientSecret = process.env.REACT_APP_CORTEX_CLIENT_SECRET;
    this.socketUrl = 'wss://localhost:6868';
    this.cortexToken = undefined;
    this.sessionId = undefined;
  }

  generateToken = () => {
    const socket = new WebSocket('wss://localhost:6868');

    const payload = {
      "id": 1, 
      "jsonrpc": "2.0", 
      "method": "authorize", 
      "params": {
        "clientId": this.cortexClientId, 
        "clientSecret": this.cortexClientSecret,
        "debit": 1 
      }, 
      "type": "Subscription"
    };

    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(payload));
    });

    socket.onmessage = (event) => {
      this.cortexToken = JSON.parse(event.data).result.cortexToken;
      console.log(this);
      socket.close();
      this.createSession();
    } 
  }

  createSession = () => {
    const socket = new WebSocket('wss://localhost:6868');

    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "createSession",
      "params": {
        "cortexToken": this.cortexToken,
        "headset": "EPOCX-E202014A",
        "status": "open"
      }
    };

    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(payload));
    });

    socket.onmessage = (event) => {
      this.sessionId = JSON.parse(event.data).result.id
      console.log(this.sessionId);
      socket.close();
      this.subscribeToSession();
    } 
  }

  subscribeToSession = () => {
    const socket = new WebSocket('wss://localhost:6868');

    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "subscribe",
      "params": {
        "cortexToken": this.cortexToken,
        "session": this.sessionId,
        "streams": ["com"]
      }
    }

    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(payload));
    });

    socket.onmessage = (event) => {
      console.log(event);
    } 
  }
}

export default CortexClient;
