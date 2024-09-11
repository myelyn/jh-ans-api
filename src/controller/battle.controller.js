const dayjs = require('dayjs')
const { cloneDeep } = require('lodash')
const { createBattle, deleteBattle, findAllBattle, updateBattle, findOneBattle } = require('../service/battle.service')
const { createBattlePlayer, deleteBattlePlayer } = require('../service/battleplayer.service')
const { createBattleError, findBattleError, deleteBattleError } = require('../constant/err.type')
const { computeBattle } = require('../task/computeBattle')

class BattleController {

  async addBattle(ctx) {
    const { startTime, endTime } = ctx.request.body
    const res = await createBattle({ startTime: dayjs(startTime).valueOf(), endTime: dayjs(endTime).valueOf() })
    ctx.body = {
      code: 0,
      msg:'已经成功发起计算任务，请稍后刷新页面查看结果',
      result: {
        id: res.id
      }
    }

    const battle = { id: res.id, startTime, endTime }

    // 发起计算任务
    try {
      const { playerObj, ctzOverview, mjsOverview } = await computeBattle(battle)
      
      const arr = []
      Object.keys(playerObj).forEach(key => {
        const player = cloneDeep(playerObj[key])
        Object.keys(player).forEach(key => {
          if (key === 'roles') {
            player[key] = player[key].join(',')
          } else if (['killNames', 'killByNames', 'operationNames', 'operationByNames', 'tags'].includes(key)) {
            player[key] = JSON.stringify(player[key])
          }
        })
        arr.push(player)
      })
      await createBattlePlayer(arr)

      await updateBattle({
        id: battle.id,
        obj: {
          mjs: JSON.stringify(mjsOverview),
          ctz: JSON.stringify(ctzOverview)
        }
      })
    } catch(e) {
      return ctx.app.emit('error', createBattleError, ctx)
    }
  }

  async deleteBattle(ctx) {
    try {
      const battleCount = await deleteBattle(ctx.params.id)
      const battlePlayerCount = await deleteBattlePlayer(ctx.params.id)
      ctx.body = {
        code: 0,
        msg: 'success',
        result: {
          battleCount,
          battlePlayerCount
        }
      }
    } catch(e) {
      return ctx.app.emit('error', deleteBattleError, ctx)
    }
  }

  async showAllBattles(ctx) {
    try {
      const res = await findAllBattle()
      ctx.body = {
        code: 0,
        msg:'success',
        result: res
      }
    } catch(e) {
      return ctx.app.emit('error', findBattleError, ctx)
    }
  }

  async findOneBattle(ctx) {
    try {
      const res = await findOneBattle(ctx.params.id)
      ctx.body = {
        code: 0,
        msg:'success',
        result: res
      }
    } catch(e) {
      return ctx.app.emit('error', findBattleError, ctx)
    }
  }

}

module.exports = new BattleController()