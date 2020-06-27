const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var vaccineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  forHuman: {
    type: Boolean,
    required: true,
  },
});

var livestockSchema = new Schema({
  breed: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

var diseaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
  precautions: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  morbidity: {
    type: Number,
    required: true,
  },
  mortality: {
    type: Number,
    required: true,
  },
  total_affected: {
    type: Number,
    required: true,
  },
  total_deaths: {
    type: Number,
    required: true,
  },
  livestock: [livestockSchema],
  vaccine: [vaccineSchema],
});

var healthCenterSchema = new Schema({
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  latlng: {
    type: String,
    required: true,
  },
  incharge: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
  },
  web: {
    type: String,
  },
});

var outbreakSchema = new Schema({
  disease: {
    type: diseaseSchema,
  },
  healthCenter: {
    type: healthCenterSchema,
  },
  latlng: {
    type: String,
    required: true,
  },
  deaths: {
    type: Number,
  },
  affected: {
    type: Number,
  },
});

module.exports = mongoose.model('Outbreak', outbreakSchema);
