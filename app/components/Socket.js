class Socket {
  constructor() {
    this.io = io.connect();
  }
}

let _socket = new Socket();
export default _socket;
