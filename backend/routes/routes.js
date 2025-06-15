const express = require('express');
const router = express.Router();
const user = require('../model/schema');

// Get message for a word
router.get('/get/:word', async (req, res) => {
    try {
        const messageObj = await user.findOne({ word: req.params.word });
        if (messageObj) {
            res.status(200).json(messageObj.message);
        } else {
            res.status(404).json("Word not found");
        }
    } catch (error) {
        res.status(500).json("Server error");
    }
});

// Add a new word/message
router.post('/send', async (req, res) => {
    try {
        const { word, message } = req.body;
        if (!word || !message) {
            return res.status(400).json({ success: false, message: "Word and message are required" });
        }
        const newtuple = new user({ word, message });
        await newtuple.save();
        res.status(201).json({
            success: true,
            user: newtuple
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all words/messages
router.get('/all', async (req, res) => {
    try {
        const all = await user.find({});
        res.status(200).json(all);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a word/message (optional)
router.delete('/delete/:word', async (req, res) => {
    try {
        const deleted = await user.findOneAndDelete({ word: req.params.word });
        if (deleted) {
            res.status(200).json({ success: true, deleted });
        } else {
            res.status(404).json({ success: false, message: "Word not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;