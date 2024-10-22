const jwt = require('jsonwebtoken');
const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userCreateError, userLoginError, modifyPasswordError, getUserInfoError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body
    try {
      const res = await createUser(username, password)
      ctx.body = {
        code: 0,
        msg: '注册成功',
        result: {
          id: res.id,
          username: res.username
        }
      }
    } catch(e) {
      return ctx.app.emit('error', userCreateError, ctx)
    }
    await next()
  }
  async login(ctx, next) {
    const { username } = ctx.request.body
    try {
      const { password, ...res } = await getUserInfo({username})
      ctx.body = {
        code: 0,
        msg: '登录成功',
        result: jwt.sign(res, JWT_SECRET, { expiresIn: '7d' })
      }
    } catch(e) {
      return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
  }
  async modifyPassword(ctx, next) {
    const { id } = ctx.state.user
    const { password } = ctx.request.body
    try {
      const res = await updateById({id, password})
      if (!res) {
        return ctx.app.emit('error', modifyPasswordError, ctx)
      }
      ctx.body = {
        code: 0,
        msg: '修改成功',
        result: ''
      }
    } catch(e) {
      return ctx.app.emit('error', modifyPasswordError, ctx)
    }
    await next()
  }
	async userInfo (ctx, next) {
		const { username, id } = ctx.request.body
		try {
    const { password, ...res } = await getUserInfo({username, id})
      ctx.body = {
        code: 0,
        msg: '操作成功',
        result: res
      }
		} catch(e) {
      return ctx.app.emit('error', getUserInfoError, ctx)
		}
		await next()
	}
}

module.exports = new UserController()