// Routing
const express = require('express');
const router = express.Router();

// Set up a logger
// loging (winston) plus custom formats for CREn
// Change formats in the logging class
const Logger = require('../services/logger_service');
const logger = new Logger('app');

//Log all calls to this one
router.use(function timeLog (req, res, next) {
    const body=req.body;
    // Add the request as log data

    logger.setLogData(body);
    logger.info("Recieved a request on ", req.body);
  next()
})
// define the home page route
router.get('/', function (req, res) {
    res.send(ads);
})
// define the about route
router.post('/', function (req, res) {
    const body = req.body;

    let error = {};

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
})

module.exports = router