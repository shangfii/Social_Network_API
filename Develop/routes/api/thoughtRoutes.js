// logical Third step is API/Routes (1. Model, 2. Controller, 3. Routes)

//Unpack router from express.router()
const router = require('express').Router();

//Import controller functions

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtControllers');

//////////////////////////////////////////
// creat express routes: /api/thought /////
/////////////////////////////////////////

router.route('/')
    .get(getThoughts)
    .post(createThought);

// creat express routes for thoughts by Id: /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// creat express route for reaction by thought Id: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// creat express route for reaction Id: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// Export all thought routes

module.exports = router;