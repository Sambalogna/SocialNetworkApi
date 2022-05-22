const router = require('express').Router();
//methods for posts and gets
const {} = require('../../controllers/userController')

// /api/users
//get all users
//post create user
router.route('/')

// /api/users/:userId
//get single user
//put update user
//delete remove user
//Bonus
//remove thoughts associated to user when thought deleted
router.route('/:userId')


module.exports = router;