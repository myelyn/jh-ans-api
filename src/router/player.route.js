const Router = require('koa-router')

const { authentication, manageAuth } = require('../middleware/auth.middleware')
const { addPlayer, getAllPlayers, getOnePlayer, updatePlayer } = require('../controller/player.controller')

const playerRouter = new Router({ prefix: '/player' })

playerRouter.post('/', addPlayer)

playerRouter.get('/', getAllPlayers)

playerRouter.get('/:id', getOnePlayer)

playerRouter.patch('/', authentication, manageAuth,  updatePlayer)

module.exports = playerRouter