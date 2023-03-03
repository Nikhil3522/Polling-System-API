const QuestionSchema = require('../models/polling');


module.exports.questionCreated = async function(req, res){
    // console.log("ques create controller", req.body);
    var totalData = await QuestionSchema.count();
    QuestionSchema.create({
        question: req.body.question,
        qid: totalData + 1,
    }, function(err, newQues){
        if(err){
            console.log("Error in creating a question!");
            return res.status(401).json({
                message: "Error in creating the question!",
            })
        }

        console.log("Question created!", newQues);
        return res.status(200).json({
            message: "Question created!",
            QuestionId: totalData + 1,
        })
    })
}

module.exports.questionDeleted = function(req, res){
    const id = req.params.id;
    QuestionSchema.deleteOne({qid: id}, (err, result) => {
        if (err) {
            return res.status(401).json({
                message: "Error in deleting the question!",
            })
        }
        
        return res.status(201).json({
            message: `Question with id ${id} deleted successfully!`,
        })

      })
}