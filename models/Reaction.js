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
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {

        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

module.exports = reactionSchema;