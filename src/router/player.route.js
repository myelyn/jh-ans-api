const Router = require('koa-router')

const { addPlayer, getAllPlayers, getOnePlayer } = require('../controller/player.controller')

const playerRouter = new Router({ prefix: '/player' })

playerRouter.post('/', addPlayer)

playerRouter.get('/', getAllPlayers)

playerRouter.get('/:id', getOnePlayer)

module.exports = playerRouter