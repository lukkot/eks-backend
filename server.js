'use strict';

const express = require('express');
const cors = require('cors')

const network = require('./ips.js')
const db = require('./db.js');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const ips = network.getIps();


// App
const app = express();
app.use(cors());

// ENDPOINTS
app.get('/', async (req, res) => {
  var dbResult = await db.getIpAndTimestamp();
  
  
  var message = "";
  message += "*** BACKEND:<br />"
  message += ips + "<br />"
  message += "<br />"
  message += "*** DB:<br />"
  message += dbResult[0].ip + "<br />"
  message += dbResult[0].timestamp + "<br />"
  
  res.send(message);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

