// Second logical stem to me is Controllers after Models
// When you hear Data Base, think Model ??

//Import models
const { Thought, User } = require('../models');

// Use an aggregate function to get the number of total thoughts
const thoughtCount = async () =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts);

//establish controller functions to be used in Routes//

module.exports = {

  // Get all thoughts: /api/thoughts/
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: 'reactions', select: '-__v'})
      .then(async(thoughts) => {
        const thoughtObj = {
          thoughts,
          thoughtCount: await thoughtCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought: /api/thought/:thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: 'reactions', select: '-__v'})
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new thought: /api/thoughts
  createThought(req, res) {
    Thought.create({thoughtText: req.body.thoughtText, username: req.body.username})
    
    //Update user info with thought created
      .then((res) => User.findOneAndUpdate(
        {_id: req.body.userId},
        { $addToSet: { thoughts: res._id }},
        { runValidators: true, new: true}
      ))
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID . Thought cannot be created' })
          : res.json(user)
      )
      .catch((err) => {
        console.log (err);
        return res.status(500).json(err);
        });
  },

   // Update a thought: /api/thoughts/:thoughtId
   updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log (err)
        return res.status(500).json(err)
        });
  },

  // Delete a thought: /api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          // Update User profile after deleting thought
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId}},
            {new: true}
          )
      )
      .then((user)=>
        !user
          ? res.status(404).json({ message: "Thought deleted, but no User found"})
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to a thought: /api/thoughts/:thoughtId/reactions
  addReaction(req, res) {
    console.log('adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: {reactionBody: req.body.reactionBody, username: req.body.username }} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID ' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete reaction from a thought: /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};