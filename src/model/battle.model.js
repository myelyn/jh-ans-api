const { DataTypes } = require('sequelize');
const seq = require('../db/seq')
const dayjs = require('dayjs')
const Battle = seq.define('battle', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return dayjs(this.getDataValue('startTime')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return dayjs(this.getDataValue('endTime')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  mjs: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('mjs')
      return value ? JSON.parse(value) : []
    }
  },
  ctz: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('ctz')
      return value ? JSON.parse(value) : []
    }
  }
}, {
  tableName: 'battles'
})

// Battle.sync({force: true})
module.exports = Battle
