/*******************************
  ENVIRONMENT VARIABLES
    We use the following:
     (1) port: Tell the server which port to run on, defaults to 3001
     (2) debuglevel: to set the level of logging [1-5] assume lvl 2 (normal)
     (3) environment : what environment we are runnign in, assume the mocking address
*******************************/
const config = require('./config');
const server = process.env.server || config.server || 'localhost';
const serverPort = process.env.port || config.port|| 3001;
const debugLevel = process.env.debugLevel || config.debugLevel || 2;
const envLevel = process.env.environment || config.environment || "dev";
const bffServer = process.env.bffServer || config.bffServer || 'localhost';
const bffPort = process.env.bffPort || config.bffPort|| 1337;

// Routes directory
const routes = require('./routes');


/*****************************
  MULTI THREADING
*****************************/
const {cpus} = require('os');
const num_workers = cpus().length;

/***************************
   WEB SERVER SET UP 
***************************/
// Express
const express = require('express');
const app = express();

// Directories for express
  // Give it a directory for static assetts such as css and js files
  app.use(express.static(process.cwd() +'/public'));

  // Set the default views to render from
  app.set('views', process.cwd() + '/views');

// Use a routes dir
app.use('/', routes);

//Converts an incoming JSON body to readable objects
const bodyParser = require('body-parser');
app.use(bodyParser.json());


/******************************
  VIEW ENGINE 
******************************/
// Use ejs
app.set('view engine', 'ejs');
//Set up the ejs View directory

/******************************
SECURITY MODULES 
******************************/
// Cors
const cors = require('cors');
app.use(cors());

// securisation of headers in express
const helmet = require('helmet');
app.use(helmet());

/*********************************
  User Security
 ********************************/
// Encryption for passwords
//const bcrypt = require('bcryptjs')


/*********************************
  MONITORING AND LOGGING 
*********************************/
// loging (winston) plus custom formats for CREn
// Change formats in the logging class
const Logger = require('./services/logger_service');
const logger = new Logger('app');


/********************************
  Log the set up parameters
********************************/
logger.info('--NEW INSTANCE OF NODE API APPLICATION STARTED--');
logger.info(`--Running on ${num_workers} cpu's--`);

if (debugLevel > 1) {
  logger.info(`--Web server @ ${server}:${serverPort} --`);  
  logger.info('--Applying debug level ' + debugLevel)
  logger.info('--Using environment ' + envLevel +'--');
  logger.info(`--Refering to BFF Server @ ${bffServer}:${bffPort} --`);
  logger.info(`--Using routing files ${routes} --`);  
};

/***************************************************************************
  Begin work section 
 **************************************************************************/

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// starting the server
app.listen(serverPort, () => {
  logger.info('Server listening on port:' + serverPort )
});