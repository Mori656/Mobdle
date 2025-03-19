const mongoose = require('mongoose');

const mobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/.test(v);
      },
      message: props => `${props.value} nie jest poprawnym URL-em obrazu!`
    }
  },
  version: {
    type: Number,
    required: true
  },
  health: {
    type: Number,
    required: true,
    min: 0
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  behavior: {
    type: [String],
    required: true
  },
  movement: {
    type: [String],
    required: true
  },
  dimension: {
    type: [String],
    required: true
  }
}, { timestamps: true }); 

const Mob = mongoose.model('Mob', mobSchema);

module.exports = Mob;
