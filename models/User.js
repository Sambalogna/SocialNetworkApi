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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        ]
            //Must match a valid email
        },
        //array of _id values referencing thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        //self referencing?
        //is this right
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
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
thoughtSchema
    .virtual('getFriends')
    .get(function(){
        return this.friends.length; 
    })

const User = model('user', userSchema);
module.exports = User;