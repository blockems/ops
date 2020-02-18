// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//const winston = require('winston');
const Logger = require('../services/logger_service');
const logger = new Logger('app');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

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