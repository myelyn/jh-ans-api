const { Op } = require("sequelize");
const KillRecord = require('../model/killrecord.model')
class KillRecordService {
  async findPeriodKillRecord({startTime, endTime}) {
    const res = await KillRecord.findAll({
      attributes: [`id`, `jh_killer_name`, `jh_killed_name`, `jh_kill_time`, `jh_kill_method`],
      where: {
        jh_kill_time: {
          [Op.between]: [startTime, endTime]
        }
      },
      order: [
        ['jh_kill_time', 'DESC']
      ]
    })
    return JSON.stringify(res)
  }
}

module.exports = new KillRecordService() 