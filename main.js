const express = require('express');
const app = express();
const port = 8080;
const Datastore = require('nedb');
const db = new Datastore({
  filename: './datastore',
  autoload: true
});
const fs = require('fs');

try {
  if (fs.existsSync('./datastore')) {} else {
    populateDataStore();
  }
} catch (err) {
  console.error(err)
}

app.use("", express.static(__dirname + "/public/html"));
app.use("/public", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("App listening on port : ", port);
});



function populateDataStore() {
  const doc = JSON.parse(fs.readFileSync('./data/DATA.json', 'UTF-8'));
  db.insert(doc);
}