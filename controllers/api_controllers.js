const QuestionSchema = require('../models/polling');
const optionsSchema = require('../models/options');


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

module.exports.optionCreate = async function(req, res){
    var totalData = await optionsSchema.count();
    const QuesId = req.params.id;
    optionsSchema.create({
        questionId: QuesId,
        options: req.body.option,
        optionId: totalData+1,
        link_to_vote: "Link"
    }, function(err, newOpt){
        if(err){
            return res.status(401).json({
                message: "Error in creating the option!",
            })
        }

        return res.status(200).json({
            message: "Option created!",
            OptionId: totalData + 1,
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

module.exports.addVote = function(req, res){
    const OptId = req.params.id;

    optionsSchema.findOne({optionId: OptId}, (err, result) => {
        // if(err){
        //     console.log("fsa");
        //     return res.status(401).json({
        //         message: `Something Worng, Please check your option Id `,
        //     })
        // }else if (!result) {
        //     console.log("Not result")
        //     return res.status(401).json({
        //         message: `Error 2 in finding the option. Please check your option Id once.`,
        //     })
        // }

        var totalVote = 0;

        if(result){
            totalVote = result.votes + 1;
        
            optionsSchema.findOneAndUpdate(
                { optionId: OptId },
                { $set: { votes : totalVote}},
                {
                    new: true, // Return the updated document
                    runValidators: true // Validate the new document against the model's schema
                }
            )
            .then(updatedDoc => {
                return res.status(201).json({
                    message: `Vote Submitted!`,
                })
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Error in voting!",
                })
            });
        }
        
    })
    // .catch(err => {
    //     return res.status(401).json({
    //         message: `Error in finding the option. Please check your option Id once.`,
    //     })
    // });

}

module.exports.showQues = function(req, res){
    const quesId = req.params.id;
    var optionsArr;
    
    optionsSchema.find( { questionId: quesId } , (err, result) => {
        if(err){
            return res.status(401).json({
                message: "Something went wrong, Please check your question Id.",
            })
        }
        optionsArr = result;

        QuestionSchema.findOne({ qid: quesId }, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Something went wrong, Please check your question Id.",
                })
            }

            return res.status(201).json({
                id: quesId ,
                title: result.question,
                option: optionsArr
            })

        })
    }).catch(err => {
        if(err){
            console.log("Erre", err)
        }
    })
}

/* Error 
addVote => solve error, if user vote for a options with options Id and that option id is not present in database 
showQues => solve error, if user enter a id that not present in database
*/