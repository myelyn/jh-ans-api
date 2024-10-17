const dayjs = require('dayjs')
const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const KillRecord = seq.define('jh_kill_record', {
  jh_killer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_killed_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jh_kill_time: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return dayjs(this.getDataValue('jh_kill_time')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  jh_kill_method: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'jh_kill_records',
  indexes: [{
    unique: true,
    name: 'uni_key',
    fields: ['jh_killer_name', 'jh_killed_name', 'jh_kill_time']
  }]
})

// KillRecord.sync({force: true})
module.exports = KillRecord