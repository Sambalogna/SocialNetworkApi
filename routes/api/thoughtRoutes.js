const router = require('express').Router();
//methods for posts and gets
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController')


// /api/thoughts
//get all
//post create thought, associated with user's thoughts[]
router.route('/')
.get(getThoughts)
.post(createThought)

// /api/thoughts/:thoughtId
//get single thought
//put update thought
//delete thought
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

// /api/thoughtId/:thought/reactions
//post create reaction stored in a single thoughts reaction array field
router.route('/:thoughtId/reactions')
.post(createReaction)

//delete to pull and remove a reaction by the reaction's reactionId 
router.route('/:thoughtId/reactions/reactionId')
.delete(deleteReaction)
module.exports = router;