export const FindPlayer = (player, socket) => {
  return player.find((p) => p.socketId === socket.id);
};
