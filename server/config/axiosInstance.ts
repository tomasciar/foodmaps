const Agent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;
const axios = require('axios');

// Create a reusable connection instance that can be passed around to different controllers
const keepAliveAgent = new Agent({
  maxSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
  maxFreeSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

// HTTPS agent
const httpsKeepAliveAgent = new HttpsAgent({
  maxSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
  maxFreeSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
  timeout: 60000, // active socket keepalive for 30 seconds
  freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

const axiosInstance = axios.create({
  // Create an agent for both HTTP and HTTPS
  httpAgent: keepAliveAgent,
  httpsAgent: httpsKeepAliveAgent
});

module.exports = axiosInstance;
