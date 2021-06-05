const { NavigationModel } = require('../models')

module.exports = {
  async getNavigation(id) {
    const Navigation = new NavigationModel()
    const rowData = await (id ? Navigation.where('id', id).get() : Navigation.get())
    return rowData
  },
}
