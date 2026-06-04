const express = require('express');
const { 
  createCertificate, 
  getAllCertificates, 
  getCertificateById, 
  updateCertificate, 
  deleteCertificate 
} = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createCertificate);
router.get('/', protect, getAllCertificates);
router.get('/:id', protect, getCertificateById);
router.put('/:id', protect, updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;
