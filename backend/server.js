const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const voteSchema = new mongoose.Schema({
    language: String,
    count: Number,
});

const Vote = mongoose.model('Vote', voteSchema);

// Get votes
app.get('/votes', async (req, res) => {
    try {
        const votes = await Vote.find();
        res.json(votes);
    } catch (error) {
        res.status(500).send('Error fetching votes');
    }
});

// Post vote
app.post('/votes', async (req, res) => {
    try {
        const { language } = req.body;
        const vote = await Vote.findOne({ language });

        if (vote) {
            vote.count += 1;
            await vote.save();
        } else {
            await new Vote({ language, count: 1 }).save();
        }

        res.json(vote);
    } catch (error) {
        res.status(500).send('Error updating vote');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
