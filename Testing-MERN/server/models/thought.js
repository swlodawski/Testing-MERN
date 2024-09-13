const { Schema, model} = require('mongoose');
const dataFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'You need to leave a thought',
        minlength: 1,
        maxlength: 200,
        trim: true
    },
    thoughtAuthor: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dataFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 200,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dataFormat(timestamp),
            },
        },
    ],
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;