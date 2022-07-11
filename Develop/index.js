// The final thing to create is putting it all together in this index

/* 
In order of how this application was created and maybe should be used always

1. Create the Models
2. Create the Controllers
3. Create the Routes (API)
4. Create this index page you are reading
5. Create the config file to start working
*/

// Unpack express from express
const express = require('express');

//import database
const db = require('./config/connection');

//Import routes
const routes = require('./routes');

//process.cwd() to get the Current Working Directory of the node.js process
const cwd = process.cwd();

//Establish   server/hosting Port for this application
const PORT = process.env.port || 3001;

//Establish the server
const app = express();

//  indicate what activities the server is running in the terminal.
const activity = cwd.includes('Social_Media_Back_End')
  ? cwd.split('/Social_Media_Back_End/')[1]
  : cwd;

//Unpack express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use the routes on this server
app.use(routes);

//Message to indicate tha the server is live
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The API server for ${activity} running on port ${PORT}!`);
  });
});