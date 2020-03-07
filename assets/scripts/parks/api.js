'use strict'
const config = require('../config')

const getAllParks = () => {
  return $.ajax({
    url: config.apiUrl + '/parks.json',
    type: 'GET',
    dataType: 'json'
  })
}

module.exports = {
  getAllParks
}
