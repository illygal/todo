import fs from "fs";
import path from "path";
import express from "express";

const app = express();
app.listen(6969, () => console.log("Server started on port 6969"));
app.use(express.static(path.join(path.resolve(), "../client/dist")));

app.get("/api/todos", (req, res) => {
  const todos = [
    {
      id: 1,
      text: "Learn Vue.js",
      done: true,
    },
    {
      id: 2,
      text: "Learn Node Express",
      done: false,
    },
  ];
  res.json(todos);
});
