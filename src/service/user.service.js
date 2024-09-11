const User = require('../model/user.model')

class userService {
  async createUser(username, password) {
    const res = await User.create({
      username,
      password
    })
    return res.dataValues
  }
  async getUserInfo ({id, username}) {
    const whereObj = {}
    id && Object.assign(whereObj, { id })
    username && Object.assign(whereObj, { username })
    const res = await User.findOne({
      attributes: ['id', 'username', 'password', 'roleId'],
      where: whereObj
    })
    return res ? res.dataValues : null
  }

  async getAllUser({id, username, roleId}){
    const whereObj = {}
    id && Object.assign(whereObj, { id })
    username && Object.assign(whereObj, { username })
    roleId && Object.assign(whereObj, { roleId })
    const res = await User.findAll({
      attributes: { exclude: ['password'] },
      where: whereObj,
      raw: true
    })
    return res?.length ? res : null
  }

  async updateById({id, username, password, roleId}) {
    const newUser = {}
    username && Object.assign(newUser, {username})
    password && Object.assign(newUser, {password})
    roleId && Object.assign(newUser, {roleId})
    const res = await User.update(newUser, {
      where: {
        id
      }
    })
    return res[0] > 0 ? true : false
  }
}

module.exports = new userService()