const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, tokenInvalidError, managerAuthError } = require('../constant/err.type')

const authentication = async (ctx, next) => {
  try {
    var decoded = jwt.verify(ctx.request.header.authorization, JWT_SECRET)
    ctx.state.user = decoded
  } catch(err) {
    if (err.name === 'TokenExpiredError') {
      return ctx.app.emit('error', tokenExpiredError, ctx)
    }
    return ctx.app.emit('error', tokenInvalidError, ctx)
  }
  await next()
}

const manageAuth = async (ctx, next) => {
  if (![1,2].includes(ctx.state.user.roleId)) {
    return ctx.app.emit('error', managerAuthError, ctx)
  }
  await next()
}

module.exports = {
  authentication, 
  manageAuth
}