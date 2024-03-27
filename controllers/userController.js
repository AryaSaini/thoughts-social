const User = require('../models/User')

const userController = {

    getAllUsers(req, res) {
        User.find({})
            .populate('thoughts')
            // .populate('friends')
            .then(userData => res.json(userData))
            .catch(err =>{console.log(err)})
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
    },

    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(500).json({ message: 'wrong id/ no user' })
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.status(500).json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(500).json({ message: 'wrong id/ no user' })
                    return;
                }
            })
            .then(() => res.json({ message: 'User has been deleted' }))
            .catch(err => res.status(500).json(err))
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(500).json({ message: 'wrong id/ no user' })
                    return
                }
                res.json(userData)
            })
            .catch(err => res.status(500).json(err))
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(500).json({ message: 'wrong id/ no user' })
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.status(500).json(err))
    }
}

module.exports = userController