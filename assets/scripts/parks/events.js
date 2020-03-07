'use strict'
const ui = require('./ui')
const api = require('./api')

const onGetAllParks = () => {
  api.getAllParks()
    .then(ui.onGetParksSuccess)
    .catch(ui.onGetParksFailure)
}

const addHandlers = event => {
  $('.get-parks').on('click', onGetAllParks)
}

module.exports = {
  addHandlers
}
