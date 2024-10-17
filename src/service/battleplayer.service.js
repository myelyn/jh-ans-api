const BattlePlayer = require('../model/battleplayer.model')
const { Op } = require("sequelize")
const Player = require('../model/player.model')
const Battle = require('../model/battle.model')

class BattlePlayerService {
  async createBattlePlayer(arr) {
    const res = await BattlePlayer.bulkCreate(arr, {
      ignoreDuplicates: true
    })
    return res.length
  }

  async findBattlePlayers (battleId) {
    const res = await BattlePlayer.findAll({
      where: {
        battleId
      },
      include: [{
        model: Player,
        as: 'playerInfo',
        attributes: ['id', 'name', 'roles', 'beforeRoles', 'camp']
      }, {
        model: Battle,
        as: 'battleInfo',
        attributes: ['id', 'startTime', 'endTime']
      }]
    })
    const resJson = res.map(p => p.toJSON());
    return resJson
  }

  async findPlayerBattles (playerId) {
    const res = await BattlePlayer.findAll({
      where: {
        playerId
      },
    })
    const resJson = res.map(p => p.toJSON());
    return resJson
  }

  async findOneBattlePlayer (battleId, playerId) {
    const res = await BattlePlayer.findOne({
      where: {
        battleId,
        playerId
      },
      include: [{
        model: Player,
        as: 'playerInfo',
        attributes: ['id', 'name', 'roles', 'beforeRoles', 'camp']
      }, {
        model: Battle,
        as: 'battleInfo',
        attributes: ['id', 'startTime', 'endTime']
      }]
    })
    return res? res.toJSON() : null
  }

  async deleteBattlePlayer(battleId) {
    const res = await BattlePlayer.destroy({
      where: {
        battleId: {
          [Op.eq]: battleId
        }
      }
    })
    return res
  }
}

module.exports = new BattlePlayerService()