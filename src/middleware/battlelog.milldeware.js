
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

const battleLogMiddleware = async (ctx, next) => {
  try {
    const time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const ip = ctx.req.headers['x-forwarded-for'] ||
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    ctx.req.connection.socket.remoteAddress
    const cnt = ctx.query.battleId ? `battleId: ${ctx.query.battleId} ` : '列表 '
    fs.appendFileSync(path.join(__dirname, '../../battlelog.txt'), `${time} ${cnt} ${ip} \n`)
  } catch (err) {
    console.log(err)
  }
  await next()
}

module.exports = {
  battleLogMiddleware
}