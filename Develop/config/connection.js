//to me the last file to create before testing

const { connect, connection } = require('mongoose');

// Use the environment variable when it exists else use locally stored DB
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionString, {// when using Mongoose 6 always set these 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Export connection
module.exports = connection;
