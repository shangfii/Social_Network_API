// Controllers to me is the logical second step ( first is th models)

//Import models
const { User, Thought } = require('../models');

// Aggregate function to get the total number of users 
const userCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

//establish controller functions to be used in Routes
module.exports = {

  // Get all users: /api/users/
  getUsers(req, res) {
    User.find()
      .populate({ path: 'friends', select: '-__v'})
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user: /api/users/:userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'friends', select: '-__v'})
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user: /api/users/
  createUser(req, res) {
    User.create({username: req.body.username, email: req.body.email})
      .then((user) => res.json(user))
      .catch((err) => {
        console.log (err);
        return res.status(500).json(err);
        });
  },
   // Update a user: /api/users/:userId
   updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log (err)
        return res.status(500).json(err)
        });
  },

  // Delete a user: /api/users/:userId
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })

        //Remove thoughts associated with deleted User, if any 
        : Thought.deleteMany({ username: {$in: user.username }})
        )
        .then(()=> res.json({ message: 'User and associated thoughts, if any have been deleted!'}))
        .catch((err) => {
          console.log (err)
          return res.status(500).json(err)
          });  
  },

  // Add a friend to a User: /api/users/:userId/friends/:friendId
  createFriend(req, res) {
    console.log('Adding a friend');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID ' })
          : res.json(user)
      )
      .catch((err) => {
        console.log (err)
        return res.status(500).json(err)
        });
  },
  // Delete friend from User: /api/users/:userId/friends/:friendId
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID ' })
          : res.json(user)
      )
      .catch((err) => {
        console.log (err)
        return res.status(500).json(err)
        });
  },
};