class Socket {
  constructor() {
    if (typeof io !== 'undefined') {
      this.io = io.connect();
    }
  }
}

let _socket = new Socket();
export default _socket;
