const {Thought, User} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
      Thought.find()
      .select("-__v")
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
      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set:req.body},
        {runValidators: true, new: true}
      )
      .then((thought)=>{
        if(!thought){
          res.status(404).json({message: 'No Thought with this id.'})
        }
        res.json(thought)
      })
      .catch((err)=> res.status(500).json(err))
    },
    //delete thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({_id: req.params.thoughtId})
      .then((thought) => {
        if(!thought){
          res.status(404).json({ message: 'No thought with this id!' })
        }
        res.json(thought)
      })
    },
    //post create reaction stored in a single thoughts reaction array field
    createReaction(req,res) {
      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
      )
      .select("-__v")
      .then((thought)=> {
        if(!thought){
          res.status(404).json({message: 'no thought with this id'})
        }
        res.json(thought)
      })
      .catch((err)=> res.status(500).json({message: err.message}))
    },

    //delete to pull and remove a reaction by the reaction's reactionId
    deleteReaction(req,res){
      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {
          reactions: {reactionId:req.params.reactionId}
         }
        },
        {runValidators: true, new: true}
      )
      .then((thought)=>{
        if(!thought){
          res.status(404).json({message: 'No thought with that Id'})
        }
        res.json(thought)
      })
      .catch((err)=> res.status(500).json({message: err.message}))
    } 
}