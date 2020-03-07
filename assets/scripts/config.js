'use strict'

let apiUrl
const apiUrls = {
  production: 'https://cors-anywhere.herokuapp.com/http://prm-interview.s3.amazonaws.com',
  development: 'https://cors-anywhere.herokuapp.com/http://prm-interview.s3.amazonaws.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
