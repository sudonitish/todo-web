const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000



app.use(express.json());
app.use(express.static("public"));

app.get('/data.json', (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      res.end("error occured");
    }
    else {
      res.end(data);
    }
  })
});



app.post('/data.json', (req, res) => {
  let nob = req.body;
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      res.end("error occured");
    }
    else {
      if (data === "")
        data = "[]";
      let todos = JSON.parse(data);
      todos.push(nob);

      fs.writeFile("./data.json", JSON.stringify(todos), (err) => {
        if (err) {
          res.end("error occured");
        }
        else {
          res.end("write to data.json success.")
        }
      })
    }
  })
});

app.post('/delete', (req, res) => {
  let nob = req.body;
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      res.end("error occured");
    }
    else {
      if (data === "")
        data = "[]";
        let todos = JSON.parse(data);
      let index = todos.findIndex((todo) => {
        return todo.id === nob.id;
      });
      todos.splice(index, 1);
      fs.writeFile("./data.json", JSON.stringify(todos), (err) => {
        if (err) {
          res.end("error occured");
        }
        else {
          res.end("write to data.json success.")
        }
      })
    }
  })
});

app.post('/update', (req, res) => {
  let nob = req.body;
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      res.end("error occured");
    }
    else {
      if (data === "")
        data = "[]";
        let todos = JSON.parse(data);
      let index = todos.findIndex((todo) => {
        return todo.id === nob.id;
      })
      todos.splice(index, 1, nob);
      fs.writeFile("./data.json", JSON.stringify(todos), (err) => {
        if (err) {
          res.end("error occured");
        }
        else {
          res.end("write to data.json success.")
        }
      })
    }
  })
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
