const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userShema = new Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  queue_status: {
    type: String,
    enum: ['available', 'unavailable', 'busy'],
    default: 'available',
    required: true,
  },
  user_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    unique: true,
    required: true,
  },
  description: String,
  ext_tel: {
    type: Number,
    unique: true,
    required: true,
  },
  profile_img: {
    type: String,
    default:
      'https://firebasestorage.googleapis.com/v0/b/telephoneagency-d77e9.appspot.com/o/users%2FimgUser.png?alt=media&token=6593d276-f340-424a-b3e9-1c4661390b03',
  },
  role: {
    type: String,
    enum: ['jr executive', 'sr executive', 'supervisor'],
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
    required: true,
  },
  updated_at: {
    type: Date,
  },
});

const queueStatus = Object.freeze({
  available: 'available',
  unavailable: 'unavailable',
  busy: 'busy',
});

const userStatus = Object.freeze({
  active: 'active',
  inactive: 'inactive',
});

const User = model('users', userShema);

module.exports = {
  User,
  queueStatus,
  userStatus,
};
