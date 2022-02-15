import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "type-ricer": "abcd",
  },
});

export default socket;
