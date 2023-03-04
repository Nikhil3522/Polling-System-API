const express = require('express');
const router = express.Router();
const api_controller = require("../controllers/api_controllers");

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.post('/questions/create', api_controller.questionCreated);
router.post('/questions/:id/options/create', api_controller.optionCreate );
router.delete('/questions/:id/delete', api_controller.questionDeleted);
router.delete('/options/:id/delete', api_controller.optionDelete);
router.post('/options/:id/add_vote', api_controller.addVote);
router.get('/questions/:id', api_controller.showQues);

module.exports = router;