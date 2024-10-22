const Player = require('../model/player.model')
const SeasonPlayer = require('../model/seasonplayer.model')
class PlayerService {
  async createPlayer(obj) {
    const res = await Player.create(obj)
    return res.toJSON()
  }
  async findAllPlayer() {
    const res = await Player.findAll({
      attributes: ['id', 'name', 'roles', 'beforeRoles', 'camp'],
      include: [{
        model: SeasonPlayer,
        as: 'seasonData',
        attributes: ['k', 'a', 'mscs', 'sameSecondRate', 'attendanceRate', 'cost']
      }]
    })
    const resJson = res.map(p => p.toJSON())
    return resJson
  }

  async findOnePlayer(id) {
    const res = await Player.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'roles', 'beforeRoles', 'camp'],
      include: [{
        model: SeasonPlayer,
        as: 'seasonData',
        attributes: ['k', 'a', 'mscs', 'sameSecondRate', 'attendanceRate', 'cost']
      }]
    })
    return res
  }

  async updateById({ id, name, camp, roles }) {
    const newPlayer = {}
    name && Object.assign(newPlayer, {name})
    camp && Object.assign(newPlayer, {camp})
    roles && Object.assign(newPlayer, {roles})
    const res = await Player.update(newPlayer, {
      where: {
        id
      }
    })
    return res[0] > 0 ? true : false
  }

}

module.exports = new PlayerService()