const router = require('express').Router();
//methods for posts and gets
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController')

// /api/users
//get all users
//post create user
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
//get single user
//put update user
//delete remove user
//Bonus
//remove thoughts associated to user when thought deleted
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

//post add friend
router.route('/userId/friends/')
.post(addFriend)
//delete remove a friend
router.route('/userId/friends/:friendId')
.delete(removeFriend)


module.exports = router;