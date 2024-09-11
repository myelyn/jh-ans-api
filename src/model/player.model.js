const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const Player = seq.define('player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  roles: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    get() {
      const value = this.getDataValue('roles')
      return value ? value.split(',') : []
    }
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '男'
  },
  beforeRoles: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    get() {
      const value = this.getDataValue('roles')
      return value ? value.split(',') : []
    }
  },
  camp: {
    type: DataTypes.STRING,
    default: 'ctz',
    allowNull: false
  }
}, {
  tableName: 'players'
})

// Player.sync({force: true})
module.exports = Player
