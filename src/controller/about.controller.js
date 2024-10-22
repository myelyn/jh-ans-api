const { findAboutInfoError } = require('../constant/err.type')
const { findAboutInfo } = require('../service/about.service')
class AboutController {
  async getAboutInfo (ctx) {
    try {
      const res = await findAboutInfo()
      ctx.body = {
        code: 0,
        msg:'success',
        result: res
      }
    } catch(e) {
      console.log(e)
      return ctx.app.emit('error', findAboutInfoError, ctx)
    }
  }
}

module.exports = new AboutController()