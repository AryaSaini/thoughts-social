const Thought = require('../models/Thought')
const User = require('../models/User')

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => res.status(500).json(err))
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(500).json(err))
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $addToSet: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(500).json({ message: 'no user found' })
                    return
                }
                res.json(userData)
            })
            .catch(err => res.status(500).json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(500).json({ message: 'no thought found' })
                    return
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(500).json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(500).json({ message: 'no thought found' })
                    return
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(500).json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                console.log(thoughtData)
                if (!thoughtData) {
                    res.status(500).json({ message: 'no thought found' })
                    return
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(500).json(err))
    },

    removeReaction({ params }, res) {
        console.log(params)
        Thought.findOneAndUpdate(
            
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(500).json({ message: 'no reaction found' })
                    return
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(500).json(err))
    }
};

module.exports = thoughtController