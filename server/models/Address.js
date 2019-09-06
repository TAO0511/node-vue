const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  phone: {type: String},
  address: {type: String},
  isDefault: {type: Boolean},
  type: {type: Number},
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Address', schema);