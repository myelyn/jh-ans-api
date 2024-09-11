
const { findAllPlayer } = require('../service/player.service')
const { findPeriodKillRecord } = require('../service/killRecord.service')
const { findPeriodOperationRecord } = require('../service/operation.service')
const { computePlayerDetail } = require('./computePlayerDetail')
const { computeOverview } = require('./computeOverview')
const { computeTags } = require('./computeTags')

const computeBattle = async (battle) => {

  // 获取参数中时间段的所有大事数据
  const killData = JSON.parse(await findPeriodKillRecord(battle))
  const operationData = JSON.parse(await findPeriodOperationRecord(battle))

  // 获取选手列表
  const players = JSON.parse(await findAllPlayer())

  // 计算选手数据
  const playerObj = computePlayerDetail(battle, players, killData, operationData)

  // 计算总体数据
  const { ctzOverview, mjsOverview } = computeOverview(playerObj)

  // 计算标签
  computeTags(playerObj, ctzOverview, mjsOverview)

  return {
    playerObj, ctzOverview, mjsOverview
  }
}

module.exports = {
  computeBattle
}