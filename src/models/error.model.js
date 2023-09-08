const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const errorSchema = new Schema({
  status: String,
  message: String,
  stack: String,
  created_at: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const Error = model('errors', errorSchema);

module.exports = Error;
