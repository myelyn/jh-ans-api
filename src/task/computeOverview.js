const computeOverview = (playerObj) => {
  const defaultObj = {
    k: 0,
    d: 0,
    a: 0,
    s: 0,
    k_zs: 0,
    k_ds: 0,
    k_fq: 0,
    k_xh: 0,
    a_jc: 0,
    a_xx: 0,
    a_xh: 0,
    a_fq: 0,
    a_ss: 0,
    a_pl: 0,
    sd: 0,
    fx: 0,
    score: 0,
    mscs: 0,
    avgscore: 0,
    avgmscs: 0,
    n: 0,
    cost: 0
  }
  const ctzOverview = {...defaultObj}
  const mjsOverview  = {...defaultObj}

  for (let key of Object.keys(playerObj)) {
    const player = playerObj[key]
    if (!(player.k + player.d + player.a + player.s)) {
      delete playerObj[key]
      continue
    }
    const totalObj = player.camp === 'ctz' ? ctzOverview : mjsOverview
    const keyList = ['k', 'd', 'a', 's', 'k_zs', 'k_ds', 'k_fq', 'k_xh', 'a_jc', 'a_xh', 'a_xx', 'a_fq', 'a_ss', 'a_pl', 'cost', 'score', 'mscs']
    for(let code of keyList) {
      totalObj[code] += player[code]
    }
    totalObj.n += 1
  }

  ctzOverview.avgmscs = ctzOverview.score / ctzOverview.n
  ctzOverview.avgscore = ctzOverview.score / ctzOverview.n
  mjsOverview.avgmscs = mjsOverview.mscs / mjsOverview.n
  mjsOverview.avgscore = mjsOverview.mscs / mjsOverview.n

  return { ctzOverview, mjsOverview }
}

module.exports = { 
  computeOverview
}