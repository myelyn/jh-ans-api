const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const About = seq.define('about', {
  info: {
    type: DataTypes.TEXT,
    allowNull: false,
    default: '',
    comment: '说明'
  },
})

// About.sync({force: true})
module.exports = About