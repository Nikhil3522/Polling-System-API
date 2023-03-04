const QuestionSchema = require('../models/polling');
const optionsSchema = require('../models/options');


module.exports.questionCreated = async function(req, res){
    var totalData = await QuestionSchema.find().sort({qid: -1}).limit(1);
    QuestionSchema.create({
        question: req.body.question,
        qid: totalData[0].qid + 1,
    }, function(err, newQues){
        if(err){
            return res.status(401).json({
                message: "Error in creating the question!",
            })
        }

        return res.status(200).json({
            message: "Question created!",
            QuestionId: totalData[0].qid + 1,
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

module.exports.optionCreate = async function(req, res){
    var totalData = await optionsSchema.find().sort({optionId: -1}).limit(1);
    const QuesId = req.params.id;
    optionsSchema.create({
        questionId: QuesId,
        options: req.body.option,
        optionId: totalData[0].optionId +1,
        link_to_vote: "Link"
    }, function(err, newOpt){
        if(err){
            return res.status(401).json({
                message: "Error in creating the option!",
            })
        }

        return res.status(200).json({
            message: "Option created!",
            OptionId: totalData[0].optionId + 1,
        })
    })
}

module.exports.optionDelete = function(req, res){
    const OptId = req.params.id;
    optionsSchema.deleteOne({optionId: OptId}, (err, result) => {
        if (err) {
            return res.status(401).json({
                message: "Error in deleting the option!",
            })
        }

        return res.status(201).json({
            message: `Option with id ${OptId} deleted successfully!`,
        })
    })
}

module.exports.addVote = async function(req, res){
    const OptId = req.params.id;
    var totalVote = 0;

    try {
        const result = await optionsSchema.findOne( { optionId: OptId });
        totalVote = result.votes + 1;

        await optionsSchema.findOneAndUpdate(
            { optionId: OptId },
            { $set: { votes : totalVote}},
            {
                new: true, // Return the updated document
                runValidators: true // Validate the new document against the model's schema
            }
        );

        return res.status(201).json({
            message: `Vote Submitted!`,
        })

    } catch (error) {
        if(error){
            return res.status(401).json({
                message: "Error in voting!",
            })
        }
        
    }
}

module.exports.showQues = async function(req, res){
    const quesId = req.params.id;
    var optionsArr;
    let title;

    try {
        const result = await QuestionSchema.findOne({ qid: quesId });
        title = result.question;

        const optionResult = await optionsSchema.find({ questionId: quesId });
        optionsArr = optionResult;
    } catch (error) {
        if(error){
            return res.status(401).json({
                message : "Somthing went wrong! Please check your question ID"
            })
        }
    }

    return res.status(201).json({
        id: quesId ,
        title: title,
        option: optionsArr
    })
}

/* Error 
addVote => solve error, if user vote for a options with options Id and that option id is not present in database 
showQues => solve error, if user enter a id that not present in database
*/