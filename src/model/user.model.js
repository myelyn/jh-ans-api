const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const User = seq.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户名'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    comment: '角色ID，1为超级管理员，2为普通管理员，10为普通成员'
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '关联的玩家ID'
  }
}, {
  paranoid: true
})

module.exports = User