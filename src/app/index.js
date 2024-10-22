const Koa = require('koa')
const { koaBody } = require('koa-body')
const userRouter = require('../router/user.route')
const battleRouter = require('../router/battle.route')
const battlePlayerRouter = require('../router/battleplayer.route')
const playerRouter = require('../router/player.route')
const aboutRouter = require('../router/about.route')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(koaBody())
app
  .use(userRouter.routes())
  .use(battleRouter.routes())
  .use(battlePlayerRouter.routes())
  .use(playerRouter.routes())
  .use(aboutRouter.routes())
app.on('error', errHandler)

module.exports = app