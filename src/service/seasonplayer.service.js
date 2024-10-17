const dayjs = require('dayjs')
const { filter, update } = require('lodash')
const seasonplayer = require('../model/seasonplayer.model')
const { findPlayerBattles } = require('./battleplayer.service')
const { findAllPlayer} = require('./player.service')
const { findAllBattle, findOneBattle } = require('./battle.service')

class SeasonPlayerService {
  // static async getAllPlayerIds () {
  //   const playerRes = await Player.findAll({
  //     attributes: ['id']
  //   })
  //   const arr = playerRes.map(p => {
  //     return {
  //       playerId: p.toJSON().id
  //     }
  //   })
  //   return arr
  // }
  // static async createSeasonPlayer() {
  //   let seasonplayersRes = await seasonplayer.findAll()
  //   if (seasonplayersRes?.length) {
  //     return
  //   }
  //   const arr = await SeasonPlayerService.getAllPlayerIds()
  //   seasonplayer.bulkCreate(arr)
  // }
  static async findOrCreateSeasonPlayer (playerId) {
    let res = await seasonplayer.findOrCreate({
      where: {
        playerId
      }
    })
    return res
  }
  async UpdateSeasonPlayer() {
    // 查找全部有效比赛，时间超过一天的是多场统计数据，应过滤掉
    const allBattle = await findAllBattle(1, 99999)
    const battleIdList = filter(allBattle.list, b => {
      return (dayjs(b.endTime).valueOf() - dayjs(b.startTime).valueOf()) < 3600 * 24 * 1000
    }).map(o => o.toJSON().id)
    console.log(battleIdList)
    // 查找全部选手
    const allPlayers = await findAllPlayer()

    for(let p of allPlayers) {
      const updateDatas = {
        k: 0,
        a: 0,
        mscs: 0,
        sameSecondRate: 0,
        attendanceRate: 0,
        cost: 0,
        attendanceNumber: 0
      }
      const playerId = p.id
      // 如果当前选手没有赛季数据，则创建一条
      await SeasonPlayerService.findOrCreateSeasonPlayer(playerId)
      // 查找该选手的全部比赛
      const playerBattleRes = await findPlayerBattles(playerId)
      if (playerBattleRes?.length) {
        playerBattleRes.forEach(item => {
          if (battleIdList.includes(item.battleId)) {
            updateDatas.k += item.k
            updateDatas.a += item.a
            updateDatas.mscs += item.mscs
            updateDatas.sameSecondRate += item.sameSecondRate
            updateDatas.cost += item.cost
            updateDatas.attendanceNumber += 1
          }
        })
        updateDatas.attendanceRate = (updateDatas.attendanceNumber / battleIdList.length).toFixed(2)
        updateDatas.mscs = (updateDatas.mscs / updateDatas.attendanceNumber).toFixed(2)
        updateDatas.sameSecondRate = (updateDatas.sameSecondRate / updateDatas.attendanceNumber).toFixed(2)
        delete updateDatas.attendanceNumber
      }
  
      // 更新选手赛季数据到数据库
      await seasonplayer.update(updateDatas, {
        where: {
          playerId
        }
      })
    }
  }
}

module.exports = new SeasonPlayerService()