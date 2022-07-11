// unpack "schema" and "model" from mongoose

const {Schema, model} = require('mongoose');

//email validation written as a function

var validateEmail = function (email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// User model Schema 

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimm: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            validate: [validateEmail, "Valid email address required"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ],
        friends: [ //[this user's friends [this]
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            },
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// Use this virtual to add friends Count to toJSON response

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// And finally we Initialize our User model
const User = model ('user', userSchema);
// Then export User model to make it available out of User.js

module.exports = User;