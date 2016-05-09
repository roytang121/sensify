class Socket {
  constructor() {
    console.log("connect io socket");
    this.io = io.connect();
  }
}

let _socket = new Socket();
export default _socket;
