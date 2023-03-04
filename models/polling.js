const mongoose = require('mongoose');
 
const questionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    qid: {
        type: Number,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

const QuestionSchema = mongoose.model('questionSchema', questionSchema);
module.exports = QuestionSchema;