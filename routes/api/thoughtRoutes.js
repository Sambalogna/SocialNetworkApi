const router = require('express').Router();
//methods for posts and gets
const {} = require('../../controllers/thoughtController')


// /api/thoughts
//get all
//post create thought, associated with user's thoughts[]
router.route('/')

// /api/thoughtId/:thought
//get single thought
//put update thought
//delete thought
router.route('/:thoughtId')


// /api/thoughtId/:thought/reactions
//post create reaction stored in a single thoughts reaction array field
//delete to pull and remove a reaction by the reaction's reactionId 
router.route('/:thoughtId/reactions')


module.exports = router;