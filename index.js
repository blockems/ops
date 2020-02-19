/* WEB SERVER SET UP */
const express = require('express');
const app = express();
// We will use routes to check security and perform logging
//const router = express.router();

//Converts an incoming JSON body to readable objects
const bodyParser = require('body-parser');
app.use(bodyParser.json());


/* SECURITY MODULES */
// Cors
const cors = require('cors');
app.use(cors());

// securisation of headers in express
const helmet = require('helmet');
app.use(helmet());

// Encryption for passwords
//const bcrypt = require('bcryptjs')


/* MONITORING AND LOGGING */

// loging (winston) plus custom formats for CREn (note: went back to pipes - fight Sadiq)
// Change formats in the logging class
const Logger = require('./services/logger_service');
const logger = new Logger('app');
logger.info('--NEW INSTANCE OF NODE API APPLICATION STARTED--');  

/* ENVIRONMENT VARIABLES
    We use the following:
     (1) port: Tell the server which port to run on, defaults to 3001
     (2) debuglevel: to set the level of logging [1-5] assume lvl 2 (normal)
     (3) environment : what environment we are runnign in, assume the mocking address
*/
const serverPort = process.env.port || 3001;
const debugLevel = process.env.debugLevel || 2;
const envLevel = process.env.environment || "dev";
const resourceManager = process.env.resourceManager || "localhost:1337";

if (debugLevel > 1) {
  logger.info('Using the following environment variables: serverPort= ' + serverPort + ', debugLevel= ' + debugLevel + ', environment=' + envLevel +', Resource Manager=' + resourceManager);  
};


// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

/*  Here we add all the routes
    To turn off a route or module comment out its corresponding load statement.abs
    of course you can find them in the routes folder
*/

// Test page (Checks the format of the refdata api)
const rtests = require('./routes/test');
app.use('/test/refdata', rtests);
if (debugLevel > 1) {
  logger.info('Added the test page for refdata');  
}

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

// starting the server
app.listen(serverPort, () => {
  logger.info('Server listening on port:' + serverPort )
});