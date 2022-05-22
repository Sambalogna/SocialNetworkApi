const {Schema, model} = require('mongoose');
const Reactions = require('./Reaction');


//created at and virtuals

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            //date
            type: Date,
            default: Date.now,
            //set default to current timestamp
            //getter method to format timestamp on query
        },
        username: {
            type: String,
        },
        reactions: [Reactions],
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
)
//virtuals for reaction count
thoughtSchema
    .virtual('getReaction')
    .get(function(){
        return this.reactions.length; 
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought