const Router = require('koa-router')

const { addBattle, deleteBattle, showAllBattles, findOneBattle } = require('../controller/battle.controller')
// const { battleLogMiddleware } = require('../middlewares/battlelog.middleware.js')

const BattleRouter = new Router({ prefix: '/battle' })

BattleRouter.post('/', addBattle)
BattleRouter.delete('/:id', deleteBattle)
BattleRouter.get('/', showAllBattles)
BattleRouter.get('/:id', findOneBattle)

module.exports = BattleRouter