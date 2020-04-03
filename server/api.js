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
    DB.report.update({Document_ID: Document_ID}, {Reviewed: true}, (err, Doc) => {
      res(true);
    });
  })
  app.get('/api/escalateDoc', async (req,res) => {
    const report = await DB.report.find({Document_ID: req.query.Document_ID})[0];
    //get all citizens whose ID's are included in the report.
    const citizens = await DB.citizen.find({$where: function(){ return report.Citizen_ID.includes(this.Citizen_ID)}})
    citizens.forEach(element => {
      await DB.citizen.update({Citizen_ID: element.Citizen_ID}, {Threat_Level: (element.Threat_Level + 1)})
    });
  })
}