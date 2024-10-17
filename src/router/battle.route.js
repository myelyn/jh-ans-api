const Router = require('koa-router')

const { addBattle, deleteBattle, showAllBattles, findOneBattle, getSameSecondRate } = require('../controller/battle.controller')
// const { battleLogMiddleware } = require('../middlewares/battlelog.middleware.js')

const BattleRouter = new Router({ prefix: '/battle' })

BattleRouter.post('/', addBattle)
BattleRouter.delete('/:id', deleteBattle)
BattleRouter.get('/list', showAllBattles)
BattleRouter.post('/secondrate', getSameSecondRate)
BattleRouter.get('/:id', findOneBattle)

module.exports = BattleRouter