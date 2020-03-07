'use strict'
const ui = require('./ui')
const api = require('./api')

const onGetAllParks = () => {
  api.getAllParks()
    .then(ui.onGetParksSuccess)
    .catch(console.error)
}

const addHandlers = event => {
  $('.get-parks').on('click', onGetAllParks)
}

module.exports = {
  addHandlers
}
