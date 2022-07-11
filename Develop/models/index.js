// Here we take the models (User, Thought, Reaction) to export and use in other areas of the applicaton 

//1. Collect the models

const User = require('./User');
const Reaction = require('./Reaction');
const Thought = require ('./Thought');

//2. Export the models for use
module.exports = {User, Reaction, Thought};