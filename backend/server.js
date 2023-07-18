const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "simplefullstacknodejs",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connected");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const sortedUsers = result.sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        } else if (a.id > b.id) {
          return -1;
        } else {
          return 0;
        }
      });
      res.send(sortedUsers);
    }
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const sql2 = "SELECT * FROM users";
      db.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const sortedUsers = result.sort((a, b) => {
            if (a.id < b.id) {
              return 1;
            } else if (a.id > b.id) {
              return -1;
            } else {
              return 0;
            }
          });
          res.send(sortedUsers);
        }
      });
    }
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const sql2 = "SELECT * FROM users";
      db.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const sortedUsers = result.sort((a, b) => {
            if (a.id < b.id) {
              return 1;
            } else if (a.id > b.id) {
              return -1;
            } else {
              return 0;
            }
          });
          res.send(sortedUsers);
        }
      });
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const sql2 = "SELECT * FROM users";
      db.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const sortedUsers = result.sort((a, b) => {
            if (a.id < b.id) {
              return 1;
            } else if (a.id > b.id) {
              return -1;
            } else {
              return 0;
            }
          });
          res.send(sortedUsers);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
