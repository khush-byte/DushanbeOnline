var express = require('express');
var app = express();

var sql = require("mssql");

// config for your database
var config = {
    user: 'pvgdev',
    password: 'zxc12345',
    server: '192.168.28.80', 
    database: 'PVG_DEV',
    "options": {
    "encrypt": false,
    "enableArithAbort": true},
};

app.get('/', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        //if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from test', function (err, recordset) {
            //if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });
});

app.get('/insert', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        //var test1 = "'test'";
        //var hello1 = "'hello'";
        var eventID = req.query.eventID;
        var event_name = req.query.event_name;
        var event_text = req.query.event_text;
        var user_name = req.query.user_name;
        var date_start = req.query.date_start;
        var date_end = req.query.date_end;
        var lat = req.query.lat;
        var lng = req.query.lng;
        var my_query = 'insert top(1)into [PVG_DEV].[dbo].[test] (eventID, event_name, event_text, user_name, date_start, date_end, lat, lng) values ('+eventID+', '+event_name+', '+event_text+', '+user_name+', '+date_start+', '+date_end+', '+lat+', '+lng+');';
        console.log(my_query);
        request.query(my_query, function (err, recordset) {
            //if (err) console.log(err);
            // send records as a response
            res.send(recordset);
            //console.log(recordset);
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});