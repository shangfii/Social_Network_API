
// Unpack router from express.router()
const router = require('express').Router();

// import ApiRoutes folder
const apiRoutes = require('./api');

// establish api route
router.use('/api', apiRoutes);

// establish error route
router.use((req, res) => res.send('Wrong route!'));

// export routes
module.exports = router;