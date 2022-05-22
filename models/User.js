const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        username:  {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //Must match a valid email
        },
        //array of _id values referencing thought model
        //is this right?
        thoughts: [thoughtSchema],
        friends: [friendSchema],
    },
    {
        toJSON: {
            //what are getters
            getters: true,
        }
    }
)

const User = model('user', userSchema);
module.exports = User;