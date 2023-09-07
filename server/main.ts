import fs from "fs";
import path from "path";
import express from "express";

const app = express();
app.listen(6969, () => console.log("Server started on port 6969"));
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
});
createDataDir();
function createDataDir() {
  if (fs.existsSync("data")) return;
  fs.mkdir("data", (err) => console.error(err));
  fs.writeFileSync("data/todos.json", JSON.stringify([]));
}
