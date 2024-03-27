const express = require('express');
const db = require('./config/connection')

const userRoutes = require('./routes/userRoutes')
const thoughtRoutes = require('./routes/thoughtRoutes')

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.use((req, res) => {
    res.status(500).json({ message: 'No Route' })
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})

