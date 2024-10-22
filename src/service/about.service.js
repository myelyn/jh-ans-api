const About = require('../model/about.model')

class AboutService {
  async findAboutInfo() {
    const res = await About.findOne()
    return res?.info || ''
  }
}

module.exports = new AboutService()