const Router = require('koa-router')
const { userValidator, verifyUsername, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { authentication } = require('../middleware/auth.middleware')
const { register, login, modifyPassword, userInfo } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

router.post('/register', userValidator, verifyUsername, crpytPassword, register)

router.post('/login', userValidator, verifyLogin, login)

router.post('/userInfo', userInfo)

router.patch('/password', authentication, crpytPassword, modifyPassword)

module.exports = router