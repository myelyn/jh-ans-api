const { findBattlePlayers, findOneBattlePlayer } = require('../service/battleplayer.service')
const { findBattlePlayerError } = require('../constant/err.type')

class BattlePlayerController {

  async getBattlePlayers (ctx) {
    try {
      const res = await findBattlePlayers(ctx.params.battleId)
      ctx.body = {
        code: 0,
        msg:'success',
        result: res
      }
    } catch(e) {
      return ctx.app.emit('error', findBattlePlayerError, ctx)
    }
  }

  async getOneBattlePlayer (ctx) {
    try {
      const res = await findOneBattlePlayer(ctx.params.battleId, ctx.params.playerId)
      ctx.body = {
        code: 0,
        msg:'success',
        result: res
      }
    } catch(e) {
      return ctx.app.emit('error', findBattlePlayerError, ctx)
    }
  }
}

module.exports = new BattlePlayerController()