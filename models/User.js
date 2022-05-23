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
            //doesn't allow caps
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Use a valid email address']
            //Must match a valid email
        },
        //array of _id values referencing thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        //self referencing?
        //is this right
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        // ----
    },
    {
        toJSON: {
            virtuals: true,
        
        }
    }
)

//virtuals for friend count
userSchema
    .virtual('getFriends')
    .get(function(){
        return this.friends.length; 
    })

const User = model('user', userSchema);
module.exports = User;