const { Op } = require("sequelize");
const OperationRecord = require('../model/operation.model')
class OperationRecordService {
  async findPeriodOperationRecord({startTime, endTime}) {
    const res = await OperationRecord.findAll({
      attributes: [`id`, `jh_operation_by`, `jh_operation_to`, `jh_operation_time`, `jh_operation_detail`],
      where: {
        jh_operation_time: {
          [Op.between]: [startTime, endTime]
        }
      }
    })
    return JSON.stringify(res)
  }
}

module.exports = new OperationRecordService() 