const getKillType = (method) => {
  if (method.includes('武功招式')) {
    return {
      name: '招杀',
      key: 'zs',
    }
  }
  if (method.includes('下毒杀人')) {
    return {
      name: '毒杀',
      key: 'ds',
    }
  }
  if (method.includes('死于小孩攻击')) {
    return {
      name: '小孩',
      key: 'xh',
    }
  }
  if (method.includes('手枪') || method.includes('绝情刀') || method.includes('神牛令')) {
    return {
      name: '法器',
      key: 'fq',
    }
  }
  if (method.includes('本领不够强')) {
    return {
      name: '自杀'
    }
  }
  return {
    name: '其它'
  }
}

const getOperationType = (detail) => {
  if (detail.includes('解除卡')) {
    return {
      name: '解除卡',
      key: 'jc',
      price: 60
    }
  }
  if (detail.includes('陷害卡')) {
    return {
      name: '陷害卡',
      key: 'xh',
      price: 60
    }
  }
  if (detail.includes('吃豆卡')) {
    return {
      name: '吃豆卡',
      key: 'cd',
      price: 30
    }
  }
  if (detail.includes('吸血虫')) {
    return {
      name: '吸血虫',
      key: 'xx',
      price: 50
    }
  }
  if (detail.includes('化功散')) {
    return {
      name: '化功散',
      key: 'hg'
    }
  }
  if (detail.includes('法器')) {
    return {
      name: '法器',
      key: 'fq',
      price: 400
    }
  }
  if (detail.includes('死神卡')) {
    return {
      name: '死神卡',
      key: 'ss',
      price: 90
    }
  }
  if (detail.includes('霹雳卡')) {
    return {
      name: '霹雳卡',
      key: 'pl',
      price: 700
    }
  }
  return {
    name: '其它'
  }
}

module.exports = {
  getKillType,
  getOperationType
}