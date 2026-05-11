const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "34.172.113.167",
  user: "admin",
  password: "mypassword",
  database: "notes_123220030"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});


// GET ALL NOTES
app.get("/notes", (req, res) => {

  db.query(
    "SELECT * FROM notes ORDER BY id DESC",
    (err, result) => {

      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }

    }
  );

});


// ADD NOTE
app.post("/notes", (req, res) => {

  const { title, content } = req.body;

  db.query(
    "INSERT INTO notes(title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {

      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }

    }
  );

});


// EDIT NOTE
app.put("/notes/:id", (req, res) => {

  const { title, content } = req.body;

  db.query(
    "UPDATE notes SET title=?, content=? WHERE id=?",
    [title, content, req.params.id],
    (err, result) => {

      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }

    }
  );

});


// DELETE NOTE
app.delete("/notes/:id", (req, res) => {

  db.query(
    "DELETE FROM notes WHERE id=?",
    [req.params.id],
    (err, result) => {

      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }

    }
  );

});


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Notes Backend Running");
});


// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});