const mongoose = require('mongoose');
 
const optionsSchema = new mongoose.Schema({
    questionId:{
        type: Number,
    },
    options: {
        type: String,
        required: true,
    },
    optionId: {
        type: Number,
        unique: true,
        require: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    link_to_vote: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});


const OptionsSchema = mongoose.model('optionsSchema', optionsSchema);
module.exports = OptionsSchema;