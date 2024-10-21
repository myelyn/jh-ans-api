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

}

module.exports = new PlayerService()