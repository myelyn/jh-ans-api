const { createPlayer, findAllPlayer, findOnePlayer, updateById } = require('../service/player.service')
const { createPlayerError, findPlayerError, updatePlayerError } = require('../constant/err.type')

class PlayerController {

  async addPlayer(ctx) {
    try {
      const { name, camp, roles, beforeRoles } = ctx.request.body
      const res = await createPlayer({ name, camp, roles, beforeRoles })
      ctx.body = {
        code: 0,
        msg:'创建成功',
        result: {
          id: res.id
        }
      }
    } catch(e) {
      return ctx.app.emit('error', createPlayerError, ctx)
    }
  }

  async updatePlayer(ctx) {
    try {
      const { id, name, camp, roles } = ctx.request.body
      const res = await updateById({ id, name, camp, roles })
      if (!res) {
        return ctx.app.emit('error', updatePlayerError, ctx)
      }
      ctx.body = {
        code: 0,
        msg:'修改成功',
        result: ''
      }
    } catch(e) {
      console.log(e)
      return ctx.app.emit('error', updatePlayerError, ctx)
    }
  }

  async getAllPlayers(ctx) {
    try {
      const res = await findAllPlayer()
      ctx.body = {
        code: 0,
        msg:'创建成功',
        result: res
      }
    } catch(e) {
      return ctx.app.emit('error', findPlayerError, ctx)
    }
  }

  async getOnePlayer(ctx) {
    const { id } = ctx.params
    try {
      const res = await findOnePlayer(id)
      ctx.body = {
        code: 0,
        msg:'创建成功',
        result: res
      }
    } catch(e) {
      return ctx.app.emit('error', findPlayerError, ctx)
    }
  }
}

module.exports = new PlayerController()