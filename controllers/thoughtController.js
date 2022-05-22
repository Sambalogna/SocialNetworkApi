const {Thought, User} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //get single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No Thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // post create thought and 
    createThought(req, res) {
      Thought.create(req.body)
        .then((Thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: Thought._id } },//insert unless already exists
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              })
            : res.json('Created the Thought 🎉')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    //good to go on these
    //put update thought
    updateThought(req, res) {

    },
    //delete thought
    deleteThought(req, res) {

    },
    //post create reaction stored in a single thoughts reaction array field
    createReaction(req,res) {

    },

    //delete to pull and remove a reaction by the reaction's reactionId
    deleteReaction(req,res){

    } 
}