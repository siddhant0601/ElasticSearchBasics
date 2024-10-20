// Import the required packages
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
require('dotenv').config();


const client = new Client({
  node: process.env.ELASTICSEARCH_NODE,  
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME, 
    password: process.env.ELASTICSEARCH_PASSWORD, 
    apiKey: process.env.ELASTICSEARCH_API_KEY,     
  },
  tls: {
    ca: fs.readFileSync(process.env.TLS_CA),      
    rejectUnauthorized: process.env.REJECT_UNAUTHORIZED === 'true', 
  },
});

module.exports = client;
