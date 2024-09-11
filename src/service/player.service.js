const Player = require('../model/player.model')

class PlayerService {
  async createPlayer(obj) {
    const res = await Player.create(obj)
    return res.toJSON()
  }
  async findAllPlayer() {
    const res = await Player.findAll({
      attributes: ['id', 'name', 'roles', 'beforeRoles', 'camp']
    })
    const resJson = res.map(p => p.toJSON())
    return resJson
  }

  async findOnePlayer(id) {
    const res = await Player.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'roles', 'beforeRoles', 'camp']
    })
    return res
  }
}

module.exports = new PlayerService()