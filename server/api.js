const bodyParser = require('body-parser');


module.exports = function API(app, DB){
  console.log("API instantiated.")
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.post('/api/login', function (req, res) {
    let employeeMatches = DB.employee.find({UserID: req.body.UserID, Password: req.body.Password}, (err, docs) => {
      if(err){

      } else {
        if(docs.length > 0){
          if(!global.app){
            global.app = {};
          }
          global.app.user = docs[0];
          res.cookie('UserID', req.body.UserID)
          res.send(true);
        }
      }
    })
  })

  app.get('/api/myQueue', () => {

  });
  app.get('/api/myInfo', (req, res) => {
    res.send(global.app.user);
  })
  app.get('/api/myDocs', (req,res) => {
    DB.report.find({Access_Level: {$lte: global.app.user.Access_Level}, Reviewed:false}, (err, docs) => {
      res.send(docs);
    });
  })
  app.get('/api/citizensByName', (req,res) => {
    const fname = req.query.name;
    DB.citizen.find({First_Name: fname}, (err, citizens) => {
      res.send(citizens);
    });
  })
  app.get('/api/getCitizen', (req,res) => {
    DB.citizen.find({Citizen_ID: req.query.Citizen_ID}, (err, citizens) => {
      res.send(citizens);
    });
  })
  app.get('/api/ignoreDoc', (req,res) => {
    const Document_ID = req.query.Document_ID;
    DB.report.find({Document_ID: Document_ID}, (err, citizens) => {
      res.send(citizens);
    });
  })
  app.get('/api/escalateDoc', (req,res) => {
    const Document_ID = req.query.Document_ID;
    DB.report.find({First_name: fname}, (err, citizens) => {
      res.send(citizens);
    });
  })
}