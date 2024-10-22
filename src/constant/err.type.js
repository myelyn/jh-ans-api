module.exports = {
  userFormatError: {
    code: '10001',
    msg: '用户名或密码为空',
    result: ''
  },
  userExistError: {
    code: '10002',
    msg: '用户名已经存在',
    result: ''
  },
  userCreateError: {
    code: '10003',
    msg: '用户注册错误',
    result: ''
  },
  userFindError: {
    code: '10004',
    msg: '用户查询错误',
    result: ''
  },
  userNotExistError: {
    code: '10005',
    msg: '用户不存在',
    result: ''
  },
  userPasswordError: {
    code: '10006',
    msg: '密码错误',
    result: ''
  },
  userLoginError: {
    code: '10007',
    msg: '用户登录失败',
    result: ''
  },
	getUserInfoError: {
		code: '10008',
		msg: '用户信息获取失败',
		result: ''
	},
  invalidPasswordError: {
    code: '10008',
    msg: '密码格式不正确',
    result: ''
  },
  modifyPasswordError: {
    code: '10009',
    msg: '修改密码失败',
    result: ''
  },
  tokenExpiredError: {
    code: '10101',
    msg: 'token已过期，请重新登录',
    result: ''
  },
  tokenInvalidError: {
    code: '10102',
    msg: '无效的token',
    result: ''
  },
  managerAuthError: {
    code: '10201',
    msg: '不是管理员，不可以操作',
    result: ''
  },
  createPlayerError: {
    code: '20001',
    msg: '创建玩家失败',
    result: ''
  },
  findPlayerError: {
    code: '20002',
    msg: '查找玩家失败',
    result: ''
  },
  createBattleError: {
    code: '30001',
    msg: '创建战斗失败',
    result: ''
  },
  findBattleError: {
    code: '30002',
    msg: '查找战斗失败',
    result: ''
  },
  deleteBattleError: {
    code: '30003',
    msg: '删除战斗失败',
    result: ''
  },
  getSameSecondRateError: {
    code: '30004',
    msg: '计算同秒率失败',
    result: ''
  },
  findBattlePlayerError: {
    code: '40001',
    msg: '查找战斗人员失败',
    result: ''
  },
  findAboutInfoError: {
    code: '50001',
    msg: '获取关于信息失败',
    result: ''
  }
}