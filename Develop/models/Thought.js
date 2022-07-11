// 1. Pack "schema" and "model" from mongoose to use

const {Schema, model} = require('mongoose');

// 2. import reactionSchema

const reactionSchema = require('./Reaction')

// 3. Thought model 

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 500,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,

        },// reactionSchema nested

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    },
);
//  virtual that adds reactionCount to toJSON response

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// initiate a Thought model

const Thought = model('thought', thoughtSchema);

// exporting the Thought model for reause

module.exports = Thought;