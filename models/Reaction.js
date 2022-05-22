const {Schema, Types} = require('mongoose');

//todo created at

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            maxlength: 280,
        },
        username: {
            type: String,
            
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

module.exports = reactionSchema;