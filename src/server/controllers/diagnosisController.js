
const Diagnosis = require('../models/Diagnosis');
const mongoose = require('mongoose');

// Upload image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    
    // Create a new diagnosis entry with proper error handling
    const diagnosis = new Diagnosis({
      user: req.userId,
      imageUrl,
    });
    
    const savedDiagnosis = await diagnosis.save();
    if (!savedDiagnosis) {
      return res.status(500).json({ message: 'Failed to save diagnosis' });
    }
    
    res.json({
      diagnosisId: savedDiagnosis._id,
      imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

// Submit symptoms and get results
const submitSymptoms = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid diagnosis ID' });
    }
    
    const diagnosis = await Diagnosis.findById(req.params.id);
    
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    
    if (diagnosis.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this diagnosis' });
    }
    
    // Save symptoms data
    diagnosis.symptoms = req.body;
    
    // Simulate model results (in real app, this would come from TensorFlow.js)
    diagnosis.results = {
      predictions: [
        { name: 'Eczema', probability: 0.65 },
        { name: 'Psoriasis', probability: 0.20 },
        { name: 'Contact Dermatitis', probability: 0.15 },
      ],
      severity: 'Moderate',
      recommendations: [
        'Keep the affected area clean and dry',
        'Apply moisturizer regularly',
        'Avoid scratching or rubbing the affected area',
        'Consider over-the-counter hydrocortisone cream',
        'Consult a dermatologist if symptoms worsen'
      ]
    };
    
    const updatedDiagnosis = await diagnosis.save();
    if (!updatedDiagnosis) {
      return res.status(500).json({ message: 'Failed to save symptoms and results' });
    }
    
    res.json({
      diagnosisId: updatedDiagnosis._id,
      results: updatedDiagnosis.results,
    });
  } catch (error) {
    console.error('Symptoms submission error:', error);
    res.status(500).json({ message: 'Server error during symptoms submission' });
  }
};

// Get results
const getResults = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid diagnosis ID' });
    }
    
    const diagnosis = await Diagnosis.findById(req.params.id);
    
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    
    if (diagnosis.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this diagnosis' });
    }
    
    if (!diagnosis.results) {
      return res.status(404).json({ message: 'No results available yet' });
    }
    
    res.json(diagnosis.results);
  } catch (error) {
    console.error('Results retrieval error:', error);
    res.status(500).json({ message: 'Server error during results retrieval' });
  }
};

// Get diagnosis history
const getHistory = async (req, res) => {
  try {
    const history = await Diagnosis.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .select('imageUrl symptoms results createdAt');
    
    res.json(history);
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ message: 'Server error during history retrieval' });
  }
};

module.exports = {
  uploadImage,
  submitSymptoms,
  getResults,
  getHistory
};
