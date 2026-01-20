const express = require("express");
const app = express();
var expressWs = require("express-ws")(app);
const WebSocket = require("ws");
const port = 3000 || process.env.PORT;

app.use(express.static("src"));
app.use(express.json());

app.ws("/.proxy", function (clientWs, req) {
  console.log("Client connected to proxy");

  const targetWs = new WebSocket("wss://api.nyj36.xyz");
  const messageQueue = [];
  let isTargetOpen = false;

  targetWs.on("open", function open() {
    console.log("Connected to target WebSocket server");
    isTargetOpen = true;
    
    // Send any queued messages
    while (messageQueue.length > 0) {
      const data = messageQueue.shift();
      targetWs.send(data);
    }
  });

  targetWs.on("message", function (data) {
    clientWs.send(data);
  });

  targetWs.on("error", function (error) {
    console.error(`Target WebSocket error: ${error.message}`);
  });

  clientWs.on("message", function (data) {
    if (isTargetOpen) {
      targetWs.send(data);
    } else {
      messageQueue.push(data)
    }
  });

  clientWs.on("close", function () {
    console.log("Client disconnected");
    targetWs.close();
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
