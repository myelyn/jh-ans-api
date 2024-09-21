const Battle = require('../model/battle.model')
const { Op } = require("sequelize")
class BattleService {
  async createBattle(obj) {
    const res = await Battle.create(obj)
    return res.toJSON()
  }

  async findAllBattle(pageNum, pageSize) {
    const { count, rows } = await Battle.findAndCountAll({
      attributes: [`id`, `startTime`, `endTime`, `ctz`, `mjs`, `updatedAt`],
      order: [['updatedAt', 'DESC']],
      offset: (pageNum - 1) * pageSize,
      limit: +pageSize
    })
    return {
      pageNum,
      pageSize,
      total: count,
      totalPage: Math.ceil(count / pageSize),
      list: rows
    }
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