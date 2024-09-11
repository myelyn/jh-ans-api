const Battle = require('../model/battle.model')
const { Op } = require("sequelize")
class BattleService {
  async createBattle(obj) {
    const res = await Battle.create(obj)
    return res.toJSON()
  }

  async findAllBattle() {
    const res = await Battle.findAll({
      attributes: [`id`, `startTime`, `endTime`, `ctz`, `mjs`],
    })
    return res
  }

  async findOneBattle(id) {
    const res = await Battle.findOne({
      attributes: [`id`, `startTime`, `endTime`, `ctz`, `mjs`],
      where: {
        id
      }
    })
    return res.toJSON()
  }

  async updateBattle ({id, obj}) {
    const res = await Battle.update(obj, {
      where: {
        id
      }
    })
    return res
  }

  async deleteBattle(battleId) {
    const res = await Battle.destroy({
      where: {
        id: {
          [Op.eq]: battleId
        }
      }
    })
    return res
  }
}

module.exports = new BattleService()