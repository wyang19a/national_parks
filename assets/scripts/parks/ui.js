'use strict'
const parksTemplate = require('../templates/parks-listing.handlebars')
const store = require('../store.js')
const Handlebars = require('handlebars')
const paginate = require('handlebars-paginate')

Handlebars.registerHelper('paginate', paginate)

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
  const state = {
    'querySet': data,
    'page': 1,
    'rows': 6,
    'window': 5
  }
  const pagination = (querySet, page, rows) => {
    const trimStart = (page - 1) * rows
    const trimEnd = trimStart + rows

    const pages = Math.ceil(querySet.length / rows)
    const trimmedData = querySet.slice(trimStart, trimEnd)
    return {
      'querySet': trimmedData,
      'pages': pages
    }
  }
  function pageButtons (pages) {
    const wrapper = $('#pagination-wrapper')[0]
    wrapper.innerHTML = ''
    let maxLeft = (state.page - Math.floor(state.window / 2))
    let maxRight = (state.page + Math.floor(state.window / 2))
    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = state.window
    }
    if (maxRight > pages) {
      maxLeft = pages - (state.window - 1)
      maxRight = pages
      if (maxLeft < 1) {
        maxLeft = 1
      }
    }
    for (let page = maxLeft; page <= maxRight; page++) {
      wrapper.innerHTML += `<button value=${page} class="page ${page === state.page ? 'active' : ''}">${page}</button>`
    }

    if (state.page !== 1) {
      wrapper.innerHTML = `<a><button value=${1} class="page">&#171; First</button><a>` + wrapper.innerHTML
    }
    if (state.page !== pages) {
      wrapper.innerHTML += `<button value=${pages} class="page">Last &#187;</button>`
    }

    $('.page').on('click', event => {
      $('.parks').empty()
      state.page = parseInt(event.target.value)
      buildData()
    })
  }
  const buildData = () => {
    const data2 = pagination(state.querySet, state.page, state.rows)
    const parksHtml = parksTemplate({
      parks: data2.querySet
    })
    $('.parks').html(parksHtml)
    pageButtons(data2.pages)
  }
  buildData()
}

const onGetParksFailure = () => {
  onFailure('Uh oh, something went wrong. Please try again later.')
}

module.exports = {
  onGetParksSuccess,
  onGetParksFailure
}
