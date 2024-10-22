const Router = require('koa-router')

const { getAboutInfo } = require('../controller/about.controller')

const aboutRouter = new Router({ prefix: '/about' })


aboutRouter.get('/info', getAboutInfo)


module.exports = aboutRouter