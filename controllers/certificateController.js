const Certificate = require('../models/Certificate');

exports.createCertificate = async (req, res) => {
  try {
    const { certificateId, recipientName, courseName, issueDate, description } = req.body;

    if (!certificateId || !recipientName || !courseName || !issueDate || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingCert = await Certificate.findOne({ certificateId });
    if (existingCert) {
      return res.status(400).json({ message: 'Certificate ID already exists' });
    }

    const certificate = await Certificate.create({
      certificateId,
      recipientName,
      courseName,
      issueDate,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: 'Certificate created successfully',
      certificate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Certificates retrieved successfully',
      data: certificates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json({
      message: 'Certificate retrieved successfully',
      certificate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const { recipientName, courseName, issueDate, description } = req.body;

    let certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    if (recipientName) certificate.recipientName = recipientName;
    if (courseName) certificate.courseName = courseName;
    if (issueDate) certificate.issueDate = issueDate;
    if (description) certificate.description = description;

    certificate = await certificate.save();

    res.status(200).json({
      message: 'Certificate updated successfully',
      certificate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json({
      message: 'Certificate deleted successfully',
      certificate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
