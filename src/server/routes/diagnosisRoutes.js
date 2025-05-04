
const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Diagnosis routes
router.post('/upload', auth, upload.single('image'), diagnosisController.uploadImage);
router.post('/:id/symptoms', auth, diagnosisController.submitSymptoms);
router.get('/:id/results', auth, diagnosisController.getResults);
router.get('/history', auth, diagnosisController.getHistory);

module.exports = router;
