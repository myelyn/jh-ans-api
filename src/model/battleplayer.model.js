const { DataTypes } = require('sequelize');
const seq = require('../db/seq')
const Player = require('./player.model')
const Battle = require('./battle.model')

const BattlePlayer = seq.define('battleplayer', {
  battleId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  playerId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  killNames: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('killNames')
      return value ? JSON.parse(value) : []
    },
    comment: '杀人数明细'
  },
  killByNames: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('killByNames')
      return value ? JSON.parse(value) : []
    },
    comment: '被杀数明细'
  },
  operationNames: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('operationNames')
      return value ? JSON.parse(value) : []
    },
    comment: '操作对象明细'
  },
  operationByNames: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('operationByNames')
      return value ? JSON.parse(value) : []
    },
    comment: '被操作对象明细'
  },
  k: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '杀人数'
  },
  d: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '阵亡数'
  },
  a: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '助攻数'
  },
  s: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '承伤数'
  },
  k_zs: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '招杀数'
  },
  k_ds: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '毒杀数'
  },
  k_fq: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '法器杀人数'
  },
  k_xh: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '小孩杀人数'
  },
  d_zs: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被招杀次数'
  },
  d_ds: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被毒杀次数'
  },
  d_fq: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被法器杀次数'
  },
  d_xh: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被小孩杀次数'
  },
  a_jc: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用解除数'
  },
  a_xh: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用陷害数'
  },
  a_cd: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用吃豆数'
  },
  a_xx: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用吸血数'
  },
  a_hg: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用化功散数'
  },
  a_fq: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用法器数'
  },
  a_ss: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用死神数'
  },
  a_pl: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '用霹雳数'
  },
  s_jc: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用解除数'
  },
  s_xh: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用陷害数'
  },
  s_cd: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用吃豆数'
  },
  s_xx: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用吸血数'
  },
  s_hg: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用化功散数'
  },
  s_fq: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用法器数'
  },
  s_ss: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用死神数'
  },
  s_pl: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被用霹雳数'
  },
  multikill: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '连杀数'
  },
  consume: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '消耗对方金币数量'
  },
  cost: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '花费金币数量'
  },
  suicide: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '自杀数'
  },
  wdo: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '攻击队友次数'
  },
  dyo: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被队友攻击次数'
  },
  fwg: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '给队友分武功次数'
  },
  kda: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'KDA'
  },
  mscs: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: '每死承伤'
  },
  sd: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '被攻击综合指数'
  },
  fx: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '贡献综合指数'
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: '综合评分'
  },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('tags')
      return value ? JSON.parse(value) : []
    },
    comment: '获得称号'
  }
}, {
  tableName: 'battle_players'
})

BattlePlayer.belongsTo(Battle, {
  foreignKey: 'battleId',
  as: 'battleInfo'
})

BattlePlayer.belongsTo(Player, {
  foreignKey: 'playerId',
  as: 'playerInfo'
})

// BattlePlayer.sync({force: true})
module.exports = BattlePlayer
