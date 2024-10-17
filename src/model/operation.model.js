const dayjs = require('dayjs')
const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const operationRecord = seq.define('jh_operation_record', {
  jh_operation_by: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_operation_to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_operation_time: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return dayjs(this.getDataValue('jh_operation_time')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  jh_operation_detail: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'jh_operation_records',
  indexes: [{
    unique: true,
    name: 'uni_key',
    fields: ['jh_operation_by', 'jh_operation_to', 'jh_operation_time']
  }]
})

// operationRecord.sync({ force: true })
module.exports = operationRecord