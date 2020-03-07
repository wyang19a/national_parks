'use strict'
const parksTemplate = require('../templates/parks-listing.handlebars')

const onSuccess = message => {
  $('.message')
    .removeClass('failure')
    .addClass('success')
    .text(message)
}

const onFailure = message => {
  $('.message')
    .removeClass('success')
    .addClass('failure')
    .text(message)
}

const onGetParksSuccess = data => {
  onSuccess('Successfully retrieved all parks data')
  console.log(data)
  const parksHtml = parksTemplate({ parks: data })
  $('.parks').html(parksHtml)
}

const onGetParksFailure = () => {
  onFailure('Uh oh, something went wrong. Please try again later.')
}

module.exports = {
  onGetParksSuccess,
  onGetParksFailure
}
