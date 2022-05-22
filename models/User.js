const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

//todo: virtuals
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
        thoughts: [Thought],
        //self referencing?
        //is this right
        friends: [User],
        // ----
    },
    {
        toJSON: {
            virtuals: true,
        
        }
    }
)

//virtuals for friend count


const User = model('user', userSchema);
module.exports = User;