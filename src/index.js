//web server
const express = require('express');
const app = express();

//Converts an incoming JSON body to readable objects
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Security
const cors = require('cors');
app.use(cors());

// securisation of express
const helmet = require('helmet');
app.use(helmet());

// http monitoring
const morgan = require('morgan');
app.use(morgan('combined'));

// loging (winston) plus custom formats for CREn
// Change formats in the logging class
const Logger = require('../services/logger_service');
const logger = new Logger('app');

// Command Line Variables (by position)
//    (1) port: Tell the server which port to run on
//    (2) debuglevel: to set the level of logging [1-5]
//    (3) environment : what environment we are runnign in
//
const myArgs = process.argv.slice(2);
const serverPort = myArgs[0];
const debugLevel = myArgs[1];
const envLevel = myArgs[2];

console.log(serverPort);
console.log(debugLevel);
console.log(envLevel);

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.post('/test', (req,res) => {
    const body = req.body;

    let error = {};

    // Add the request as log data
    logger.setLogData(body);
    logger.info("Recieved a request on /test", req.body);

    // We expect a variable denoting the reference data set
    // so check for it
    if (body.refdata == null || body.refdata == "") {
        logger.error("No reference data store variable specified");
        error["refdata"] = "no reference data store variable specified";
    };

    //And if there are errors then do something
    if (Object.keys(error).length != 0) { 
        logger.error("Return error response", {
            "sucess":false
        })
        res.send('{"testresult":"Error, Message format incorrect."}');
    }else{
        logger.info("Return sucess response", {
            "sucess": true
        })
        res.send('{"testresult":"Message format correct"}');
    };    

});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});