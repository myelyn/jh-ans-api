const computeTags = (playerObj) => {

  const maxTagMap = new Map([
    ['sd', '挨最毒的打'],
    ['a', '最强辅助'],
    ['fx', '无私奉献'],
    ['s', '仇恨拉满'],
    ['s_pl', '霹得亲妈不认'],
    ['a_jc', '控制拉满'],
    ['a_xh', '无限火力'],
    ['a_xx', '嗜血成性'],
    ['a_cd', '废人武功'],
    ['k_ds', '毒王'],
    ['k_zs', '无敌剑客'],
    ['mscs', '固若金汤'],
    ['cost', '壕无人性'],
    ['d', '满头包'],
    ['k', '杀人王'],
    ['multikill', '战场终结者'],
    ['score', 'MVP']
  ])
  const maxPlayerMap = new Map()

  for (let key of Object.keys(playerObj)) {
    const player = playerObj[key]
    player.kda = +((player.s + player.a + player.k * 20) / (player.d * 20 || 1)).toFixed(1)
    player.mscs = +(player.s / (player.d || 1/3)).toFixed(1)
    player.sd = player.s + player.d * 10
    player.fx = player.a - player.k * 10
    player.score = player.s + player.a + player.k * 12 - player.d * 6

    if (player.k > 0) {
      Object.keys(player.killNames).forEach(key => {
        if (player.killNames[key] / player.k > 0.3  && player.k > 15) {
          player.tags?.push(`${key}杀手`)
        } 
      })
      if (player.k_zs / player.k > 0.95 && player.k > 10 ) {
        player.tags?.push(`拼命三郎`)
      } 
      if (player.k_ds / player.k > 0.95 && player.k > 10 ) {
        player.tags?.push(`擅长用毒`)
      } 
      if (player.k_fq / player.k > 0.5 && player.k > 10 ) {
        player.tags?.push(`法器专家`)
      } 
      if (player.k_xh > 3 ) {
        player.tags?.push(`生了个主力`)
      } 
      if (player.multikill >= 5) {
        player.tags?.push(`${player.multikill}连杀`)
      }
    }

    if (player.d > 0) {
      Object.keys(player.killByNames).forEach(key => {
        if (player.killByNames[key] / player.d > 0.4 && player.d > 10 ) {
          player.tags?.push(`${key}这场克我`)
        } 
      })
    }

    if (player.a > 0) {
      Object.keys(player.operationNames).forEach(key => {
        if (player.operationNames[key] / player.a > 0.3 && player.a > 80 ) {
          player?.tags?.push(`和${key}相爱相杀`)
        } 
      })
      if (player.a_jc / player.a > 0.5 && player.a > 80 ) {
        player?.tags?.push(`控制型选手`)
      } 
      if (player.a_xh / player.a > 0.7 && player.a > 80 ) {
        player?.tags?.push(`陷害型选手`)
      } 
      if (player.a_fq / player.a > 0.1 && player.a > 80 ) {
        player?.tags?.push(`法器选手`)
      } 
      if (player.a_xx / player.a > 0.5 && player.a > 80  ) {
        player?.tags?.push(`吸血鬼`)
      } 
      if (player.a_ss > 0 ) {
        player?.tags?.push(`派发死神`)
      }
      if (player.a_pl > 0 ) {
        player?.tags?.push(`霹雳啪啦`)
      }
    }

    if (player.s > 0) {
      Object.keys(player.operationByNames).forEach(key => {
        if (player.operationByNames[key] / player.s > 0.28 && player.s > 50 ) {
          player?.tags?.push(`被${key}追着打`)
        } 
      })
      if (player.s_ss > 0 ) {
        player?.tags?.push(`死神降临`)
      }
      if (player.s_pl > 0 ) {
        player?.tags?.push(`挨霹倒霉蛋`)
      }
    }

    if (player.suicide > 0) {
      player.tags?.push('狠起来连自己都杀')
    }
    if (player.wdo > 0) {
      player.tags?.push('我是卧底')
    }
    if (player.dyo > 0) {
      player.tags?.push('惨遭背刺')
    }
    if (player.fwg > 0) {
      player.tags?.push('有福同享')
    }
    if (player.k === 0) {
      player.tags?.push('我信佛哦')
    }

    if (player.a === 0) {
      player.tags?.push('打了个酱油')
    }

    if (player.s === 0) {
      player.tags?.push('广结善缘')
    }

    if (player.kda > 5 && player.k > 60) {
      player.tags?.push('天秀')
    }

    if (player.mscs >= 30 && player.s > 50) {
      player.tags?.push('超硬')
    }

    if (player.mscs >= 22 & player.mscs < 30 && player.s > 50) {
      player.tags?.push('很硬')
    }

    if (player.mscs > 18 && player.mscs < 22 && player.s > 50) {
      player.tags?.push('有点硬')
    }

    for(let [indicator] of maxTagMap) {
      const curMaxPlayer = maxPlayerMap.get(indicator + player.camp) 
      if (!curMaxPlayer || playerObj[curMaxPlayer][indicator] < player[indicator]) {
        maxPlayerMap.set(indicator + player.camp, key) 
      }
    }
    delete player.camp
    delete player.curkill
  }

  for(let [indicator, name] of maxPlayerMap) {
    const code = indicator.replace(/ctz/g, '').replace(/mjs/g, '')
    if (code === 's_pl' && playerObj[name].s_pl < 10) continue
    if (code === 'multikill' && playerObj[name].multikill < 10) continue
    if (code === 'k' && playerObj[name].k < 10) continue
    playerObj[name].tags?.unshift(maxTagMap.get(code))
  }
}

module.exports = { 
  computeTags
}