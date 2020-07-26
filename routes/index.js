// Routing
const express = require('express');
const router = express.Router();

// home page route
router.get('/', function (req, res) {
    var userInfo = {}; 
    if (typeof req.session == 'undefined') {
        userInfo.me = 1;
        userInfo.userType = 'none';
        userInfo.userName = 'Not Logged In'
    }else{
        userInfo.me = req.session.me;
        userInfo.userType = req.session.userType;
        userInfo.userType = req.session.userName;
    }; 
    res.render('index',{'userInfo':userInfo});
})

// Delta section
router.post('/delta', function (req, res) {
    res.render('index');
})

// define the about route
router.post('/about', function (req, res) {
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