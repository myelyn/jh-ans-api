const { Sequelize } = require('sequelize')
const { MYSQL_DB, MYSQL_USER, MYSQL_PWD, MYSQL_HOST } = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  timezone: '+08:00'
})

const testSeq = async () => {
  try {
    await seq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testSeq()

const syncModel = async () => {
  // await seq.sync({alter: true});
  console.log("所有模型均已成功同步.");
}

// syncModel()

module.exports = seq