/* global XMLHttpRequest */
(function () {
  'use strict'
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const searchUrl = `https://gyazo.com/images/search?q=${request.keyword}`
    let xhr = new XMLHttpRequest()
    xhr.open('GET', searchUrl)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = xhr.response
        sendResponse(data)
      }
    }
    xhr.send()
    return true
  })
})()
