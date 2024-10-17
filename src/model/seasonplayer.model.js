const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const SeasonPlayer = seq.define('seasonplayer', {
  playerId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  k: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: true
  },
  a: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: true
  },
  mscs: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: true
  },
  sameSecondRate: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
    comment: '同秒率'
  },
  attendanceRate: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
    comment: '出勤率'
  },
  cost: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: true
  }
}, {
  tableName: 'seasonplayer'
})

// SeasonPlayer.sync({force: true})
module.exports = SeasonPlayer
