import express from "express";
import swaggerUi from "swagger-ui-express";
import { v4 as uuidv4 } from "uuid";
import WebSocket, { WebSocketServer } from "ws";
import YAML from "yamljs";
import { Channel, ChannelMessages, Message } from "./models";

// Initialize Express App
const app = express();
const cors = require("cors");
app.use(express.json()); // bodyParser.json() is deprecated
app.use(cors());

// Load Swagger document
const swaggerDocument = YAML.load("specs.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory storage setup
const channels: Channel[] = [
  { id: uuidv4(), name: "general" },
  { id: uuidv4(), name: "random" },
  { id: uuidv4(), name: "tech" },
];
const messages: ChannelMessages = {};
channels.forEach((channel) => (messages[channel.id] = []));

// Helper function to find a channel by name
const findChannelByName = (name: string): Channel | undefined => {
  return channels.find((channel) => channel.name === name);
};

// WebSocket setup
const server = app.listen(3001, () =>
  console.log("Server running on port 3001")
);
const wss: WebSocketServer = new WebSocketServer({ server });

// Broadcast message to all connected clients
const broadcastMessage = (data: string): void => {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Routes
app.get("/channels", (req, res) => {
  // Sending the whole channel objects instead of just names
  res.json(channels);
});

app.get("/messages/:channelName", (req, res) => {
  const { channelName } = req.params;
  const channel = findChannelByName(channelName);
  if (!channel) return res.status(404).send({ error: "Channel not found" });

  res.json(messages[channel.id]);
});

app.post("/:channelName/messages", (req, res) => {
  const { channelName } = req.params;
  const { text, user } = req.body;
  const channel = findChannelByName(channelName);

  if (!channel) return res.status(404).send({ error: "Channel not found" });
  if (typeof text !== "string" || typeof user !== "string") {
    return res.status(400).send({ error: "Invalid message or user" });
  }

  const newMessage: Message = {
    id: uuidv4(),
    text,
    user,
    timestamp: Date.now(),
  };
  messages[channel.id].push(newMessage);
  broadcastMessage(JSON.stringify(newMessage));

  res.status(201).json(newMessage);
});

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});
