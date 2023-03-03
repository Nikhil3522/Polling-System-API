const express = require('express');
const router = express.Router();
const api_controller = require("../controllers/api_controllers");

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.post('/questions/create', api_controller.questionCreated);
router.post('/questions/:id/options/create', );
router.delete('/questions/:id/delete', api_controller.questionDeleted);
router.delete('/options/:id/delete', );
router.post('/options/:id/add_vote', );
router.get('/questions/:id', );

module.exports = router;