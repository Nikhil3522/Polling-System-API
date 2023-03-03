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

console.log("schemaaa created!")

const QuestionSchema = mongoose.model('questionSchema', questionSchema);
console.log("schema created!")
module.exports = QuestionSchema;