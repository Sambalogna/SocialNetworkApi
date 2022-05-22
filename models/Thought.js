const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction')

//created at and virtuals

const thoughtSchema = new Schema(
    {
        thougthText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            //date
            //set default to current timestamp
            //getter method to format timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
)
//virtuals for reaction count




const Thought = model('thought', thoughtSchema);

module.exports = Thought