const express = require('express');
const app = express();
const port = 8080;
const Datastore = require('nedb');
const fs = require('fs');
const API = require('./server/api');

app.use(express.json());

let DB = {};
DB.employee = new Datastore({
  filename: './data/employee',
  autoload: true
});
DB.report = new Datastore({
  filename: './data/report',
  autoload: true
});
DB.citizen = new Datastore({
  filename: './data/citizen',
  autoload: true
});

try {
  if (fs.existsSync('./data/employee')) {} else {
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

API(app, DB);


function populateDataStore() {
  const doc = JSON.parse(fs.readFileSync('./data/DATA.json', 'UTF-8'));

  const employee = doc.Employee;
  const citizenReport = doc.Citizen_Report;
  const citizen = doc.Citizen;

  for(let i of employee){
    DB.employee.insert(i);
  }
  for(let i of citizenReport){
    DB.report.insert(i);
  }
  for(let i of citizen){
    DB.citizen.insert(i);
  }
}