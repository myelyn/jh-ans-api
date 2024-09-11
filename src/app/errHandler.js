module.exports = (err, ctx) => {
  let status
  switch (err.code) {
    case '10001':
      status = 400
      break
    case '10002':
      status = 409
      break
    default:
      status = 500
  }
  ctx.body = err
  ctx.status = status
}