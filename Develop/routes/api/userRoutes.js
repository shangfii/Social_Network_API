// logical Third step is API/Routes (1. Model, 2. Controller, 3. Routes)


//unpack router from express.router()

const router = require('express').Router();

//importing controller functions
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/userControllers.js');
  
 ////////////////////////////////////////
// creat express routes: /api/users /////
/////////////////////////////////////////

//: /api/users

router.route('/')
    .get(getUsers)
    .post(createUser);

// creat express routes to get a user by Id: /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// creat express route to get a user's friends: /api/users/:userId/friends
router.route('/:userId/friends/:friendId')
    .post(createFriend);

// creat express route to get a user's friends Id: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .delete(deleteFriend);

//Export all user routes
module.exports = router;