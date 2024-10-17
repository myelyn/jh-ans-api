const dayjs = require('dayjs')
const { find } = require('lodash')
const { getKillType, getOperationType } = require('../constant/killAndOperTypes')

const computePlayerDetail = (battle, players, killData, operationData) => {
  const playerObj = {}
  players.forEach(item => {
    playerObj[item.name] = {
      battleId: battle.id,
      playerId: item.id,
      camp: item.camp,
      killNames: {},
      killByNames: {},
      operationNames: {},
      operationByNames: {},
      k: 0,
      d: 0,
      a: 0,
      s: 0,
      k_zs: 0,
      k_ds: 0,
      k_fq: 0,
      k_xh: 0, // 小孩
      d_zs: 0,
      d_ds: 0,
      d_fq: 0,
      d_xh: 0, // 小孩
      a_jc: 0,
      a_xh: 0,
      a_cd: 0,
      a_xx: 0, // 吸血
      a_hg: 0, // 化功
      a_fq: 0, // 法器
      a_ss: 0, // 死神
      a_pl: 0, // 霹雳
      s_jc: 0,
      s_xh: 0,
      s_cd: 0,
      s_xx: 0, // 吸血
      s_hg: 0, // 化功
      s_fq: 0, // 法器
      s_ss: 0, // 死神
      s_pl: 0, // 霹雳
      multikill: 0,
      curkill: 0,
      consume: 0,
      cost: 0, // 花费
      suicide: 0,
      wdo: 0, // 杀队友
      dyo: 0, // 遭背刺
      fwg: 0, // 分武功
      kda: 0,
      mscs: 0, // 每死承伤
      sd: 0, // 阵亡和承伤综合系数
      fx: 0, // 奉献系数
      score: 0, // 评分
      tags: [],
      timeList: {},
      sameSecondList: [],
      sameSecondRate: 0,
      sendNumber: 0
    }
  })

  for (let k of killData) {
    // 为杀人者 增加一条杀人记录和一条杀人方式记录，为被杀者 增加一条被杀记录和一条被杀方式记录，
    const killer = find(players, p => (p.beforeRoles.includes(k.jh_killer_name) || p.roles.includes(k.jh_killer_name)))?.name
    const killed = find(players, p => (p.beforeRoles.includes(k.jh_killed_name) || p.roles.includes(k.jh_killed_name)))?.name
    const killType = getKillType(k.jh_kill_method)
    if (killer && killed) {
      const killerObj = playerObj[killer]
      const killedObj = playerObj[killed]
      killerObj.k += 1
      killedObj.d += 1
      killerObj.curkill += 1
      if (killerObj.multikill < killerObj.curkill) {
        killerObj.multikill = killerObj.curkill
      }
      killedObj.curkill = 0
      killerObj.killNames[killed] ? killerObj.killNames[killed] += 1 : killerObj.killNames[killed] = 1
      killedObj.killByNames[killer] ? killedObj.killByNames[killer] += 1 : killedObj.killByNames[killer] = 1
      if (killType?.key) {
        killerObj[`k_${killType['key']}`] += 1
        killedObj[`d_${killType['key']}`] += 1
      }
      if (killer === killed) {
        killerObj.suicide += 1
      }
      if (killerObj.camp === killedObj.camp) {
        killerObj.wdo += 1
        killedObj.dyo += 1
      }
      const formatTime = dayjs(k.jh_kill_time).format('YYYY-MM-DD HH:mm:ss')
      killerObj.sendNumber += 1
      killerObj.timeList[formatTime]?.length ? killerObj.timeList[formatTime].push(k) : killerObj.timeList[formatTime] = [k]
    }
  }
  for (let o of operationData) {
    // 为操作者 增加一条操作记录和一条操作方式记录，为被操作者 增加一条被操作记录和一条被操作方式记录，
    const operator = find(players, p => (p.beforeRoles.includes(o.jh_operation_by) || p.roles.includes(o.jh_operation_by)))?.name
    const operated = find(players, p => (p.beforeRoles.includes(o.jh_operation_to) || p.roles.includes(o.jh_operation_to)))?.name
    const operationType = getOperationType(o.jh_operation_detail)
    if (operator && operated) {
      const operatorObj = playerObj[operator]
      const operatedObj = playerObj[operated]
      operatorObj.a += 1
      operatedObj.s += 1
      operatorObj.operationNames[operated] ? operatorObj.operationNames[operated] += 1 : operatorObj.operationNames[operated] = 1
      operatedObj.operationByNames[operator] ? operatedObj.operationByNames[operator] += 1 : operatedObj.operationByNames[operator] = 1
      if (operationType['key']) {
        operatorObj[`a_${operationType['key']}`] += 1
        operatedObj[`s_${operationType['key']}`] += 1
      }
      if (operationType['price']) {
        operatorObj.cost += operationType['price']
        operatedObj.consume += operationType['price']
      }
      if ( (operator !== operated) && (operatorObj.camp === operatedObj.camp)) {
        if (operationType === '化功散') {
          operatedObj.fwg += 1
        } else if (operationType !== '其它') {
          operatorObj.wdo += 1
          operatedObj.dyo += 1
        }
      }
      operatorObj.sendNumber += 1
      const formatTime = dayjs(o.jh_operation_time).format('YYYY-MM-DD HH:mm:ss')
      operatorObj.timeList[formatTime]?.length ? operatorObj.timeList[formatTime].push(o) : operatorObj.timeList[formatTime] = [o]
    }
  }


  // 计算同秒率
  for (let key of Object.keys(playerObj)) {
    const player = playerObj[key]
    Object.keys(player.timeList).forEach(t => {
      if (player.timeList[t].length >= 2) {
        player.sameSecondList.push(...player.timeList[t])
      }
    })
    delete player.timeList
    sameNumber = player.sameSecondList.length
    player.sameSecondRate = (sameNumber / player.sendNumber).toFixed(2)
  }
  
  return playerObj
}

module.exports = {
  computePlayerDetail
}