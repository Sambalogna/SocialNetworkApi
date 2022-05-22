const User = require('../models/User');

module.exports = {
    //get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //find a user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  //put update user
  updateUser(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body },
      {runValidators: true, new: true}
    )
    .then((user) => {
      if(!user){
        res.status(404).json({message: 'No User with this id!'})
      }
      res.json(user)
    })
    .catch((err)=> res.status(500).json(err))
  },
  //delete remove user
  deleteUser(req,res){
    User.findOneAndDelete({_id: req.params.userId})
    .then((user) => {
        if(!user){
          res.status(404).json({ message: 'No user with this id!' })
        }
        console.log('User deleted')
    }
    )
  },
  //Bonus
  //remove thoughts associated to user when thought deleted


  addFriend(req,res) {

  },

  removeFriend(req,res) {

  },

}