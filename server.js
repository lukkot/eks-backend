'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

const network = require('./ips.js');
const db = require('./db.js');
const env = require('./environment_variables.js');


// Constants
const PORT = 8081;
const HOST = '0.0.0.0';
const ips = network.getIps();


// App
const app = express();
app.use(cors());

// ENDPOINTS UTILS
const endpoint = async (path, req, res) => {
  var dbResult = await db.getIpAndTimestamp();
  var backendInternalResult = (await superagent.get(env.BACKEND_INTERNAL_HOST + ':' + env.BACKEND_INTERNAL_PORT)).text;

  var message = "";

  message += "*** PATH: /<br />";
  message += "<br />";
  message += "<br />";

  message += "*** BACKEND:<br />";
  message += ips + "<br />";
  message += "<br />";

  message += "*** DB:<br />";
  message += dbResult[0].ip + "<br />";
  message += dbResult[0].timestamp + "<br />";
  message += "<br />";
  message += "<br />";

  message += backendInternalResult;

  res.send(message);
}

// ENDPOINTS
app.get('/', endpoint.bind(null, '/'));
app.get('/api', endpoint.bind(null, '/api'));
app.get('/foo/*', endpoint.bind(null, '/foo/*'));

app.listen(PORT, HOST);
console.log(`Running on http:${HOST}:${PORT}`);

