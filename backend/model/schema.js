const {
    Schema,
    model
} = require('mongoose');

const myschema = new Schema({
    word: {
        type: String,
        required: true,
        maxlength: 50
    },
    message: {
        type: String,
        required: true, // <-- fixed typo here
        maxlength: 1000
    },
    // createdAt: { type: Date, default: Date.now }
});

const taskmodel = model('wordsearch', myschema);

module.exports = taskmodel;