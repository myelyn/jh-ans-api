const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { 
  userFormatError, 
  userExistError, 
  userFindError, 
  userNotExistError, 
  userPasswordError, 
  userLoginError,
  invalidPasswordError } = require('../constant/err.type')

const userValidator = async(ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return ctx.app.emit('error', userFormatError, ctx)
  }
  await next()
}

const verifyUsername = async(ctx, next) => {
  const { username } = ctx.request.body
  try {
    const res = await getUserInfo({username})
    if (res) {
      return ctx.app.emit('error', userExistError, ctx)
    }
  } catch(e) {
    return ctx.app.emit('error', userFindError, ctx)
  }
  await next()
}

const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  if (!/^[a-zA-Z0-9_-]{6,18}$/.test(password)) {
    return ctx.app.emit('error', invalidPasswordError, ctx)
  }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  try {
    const res = await getUserInfo({username})
    if (!res) {
      return ctx.app.emit('error', userNotExistError, ctx)
    }
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', userPasswordError, ctx)
    }
  } catch(e) {
    return ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUsername,
  crpytPassword,
  verifyLogin
}