const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../controllers/thoughController')

//get all thoughts
router.get('/', getAllThoughts);

// get thought by id
router.get('/:id', getThoughtById);

//new thought 
router.post('/', createThought);

//update thought by id
router.put('/:id', updateThought);

//delete thought by id 
router.delete('/:id', deleteThought);

//create reaction that gets stored in thought 
router.post('/:thoughtId/reactions', addReaction)

//delete reaction by id 
router.delete('/:thoughtId/reactions/:reactionId', removeReaction)

module.exports = router