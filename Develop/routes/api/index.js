// Unpack router from express.router() to use
const router = require('express').Router();

//import Users and Thoughts routes
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// establish routes

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// exporting all routes 
module.exports = router;