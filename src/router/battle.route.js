const Router = require('koa-router')

const { addBattle, deleteBattle, showAllBattles, findOneBattle, getSameSecondRate } = require('../controller/battle.controller')
const { authentication, manageAuth } = require('../middleware/auth.middleware')

const BattleRouter = new Router({ prefix: '/battle' })

BattleRouter.get('/list', showAllBattles)
BattleRouter.post('/', authentication, manageAuth, addBattle)
BattleRouter.delete('/:id', authentication, manageAuth, deleteBattle)
BattleRouter.post('/secondrate', authentication, manageAuth, getSameSecondRate)
BattleRouter.get('/:id', findOneBattle)

module.exports = BattleRouter