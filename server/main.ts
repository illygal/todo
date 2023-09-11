import fs from "fs";
import path from "path";
import express from "express";
import { WebSocketServer, type WebSocket } from "ws";

const app = express();
const server = app.listen(6969, () =>
  console.log("Server started on port 6969")
);

const clients = new Map<number, WebSocket>();
const wss = new WebSocketServer({ server });
wss.on("connection", (ws: WebSocket) => {
  const id = Math.random();
  clients.set(id, ws);
  console.log("Client connected");
  ws.on("close", () => clients.delete(id));
});

setInterval(() => {
  clients.forEach((ws) => ws.ping());
}, 5000);
// app.use(
//   express.static(path.join(path.resolve(), "../../../calc/rechner/dist"))
// );
app.use(express.static(path.join(path.resolve(), "../client/dist")));
app.use(express.json());

app.get("/api/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("data/todos.json", "utf-8"));
  res.json(todos);
});
app.post("/api/todos", (req, res) => {
  const data = req.body;
  fs.writeFileSync("data/todos.json", JSON.stringify(data));
  res.sendStatus(200);
  clients.forEach((ws) => ws.send(JSON.stringify(data)));
});
createDataDir();
function createDataDir() {
  if (fs.existsSync("data")) return;
  fs.mkdir("data", (err) => console.error(err));
  fs.writeFileSync("data/todos.json", JSON.stringify([]));
}
