const {Schema, model} = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatarUrl: {
        type: String,
        required: true
    },
    likedDevs: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikedDevs: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {
     timestamps: true // this is needed to mongoose add 'createdAt' and 'updatedAt' entries in our table
});

module.exports = model('Dev', DevSchema);