const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')
const thoughtRoutes = require('./routes/thoughtRoutes')

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MOGODB_UR || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreatedIndex: true,
    useFindAndModify: false
});

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.use((req, res) => {
    res.status(500).json({ message: 'No Route' })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});