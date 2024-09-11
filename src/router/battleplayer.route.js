const Router = require('koa-router')

const { getBattlePlayers, getOneBattlePlayer } = require('../controller/battleplayer.controller')

const battlePlayerRouter = new Router({ prefix: '/battleplayer' })

battlePlayerRouter.get('/:battleId', getBattlePlayers)
battlePlayerRouter.get('/:battleId/:playerId', getOneBattlePlayer)

module.exports = battlePlayerRouter