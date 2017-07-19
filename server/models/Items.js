'use strict';
const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  }
});

const Items = mongoose.model('Items', ItemsSchema);

module.exports = Items;
