require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`New player connected: ${socket.id}`);

  socket.on("rollDice", () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    io.emit("diceRolled", { player: socket.id, roll });
  });

  socket.on("disconnect", () => {
    console.log(`Player ${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
