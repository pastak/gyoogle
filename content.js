(function () {
  'use strict'
  let queries = {}
  let topbar = document.getElementById('topabar')
  if (!topbar) {
    return false
  }
  window.location.search.substr(1).split('&').forEach(function (item) {
    let tmp = item.split('=')
    queries[tmp[0]] = tmp[1]
  })
  const keyword = queries.q
  let ivySearchContainer = document.createElement('div')
  ivySearchContainer.style.margin = '0 20px'
  ivySearchContainer.style.borderBottom = '1px solid rgba(0, 0, 0, 0.07)'
  ivySearchContainer.style.paddingBottom = '5px'
  topbar.appendChild(ivySearchContainer)

  let header = document.createElement('div')
  header.style.fontSize = '18px'
  header.style.marginBottom = '10px'
  const pageUrl = `https://gyazo.com/search/${keyword}`
  header.innerHTML = `
    <span>IvySearch</span>
    <a href='${pageUrl}' target='_blank'>
      see more result
    </a>
    <span style='float: right;font-size: 13px;'>
      Inserted by Gyoogle Extension
    </span>`
  ivySearchContainer.appendChild(header)

  let imageListContainer = document.createElement('div')
  imageListContainer.style.height = '110px'
  imageListContainer.style.overflowY = 'scroll'
  ivySearchContainer.appendChild(imageListContainer)

  chrome.runtime.sendMessage({keyword}, function (response) {
    JSON.parse(response).slice(0, 24).forEach(function (item) {
      let imageContainer = document.createElement('span')
      imageContainer.style.margin = '0 3px'
      imageContainer.innerHTML = `
        <a href='${item.permalink_url}' target='_blank'>
          <img src='${item.search_thumb_url}' />
        </a>
      `
      imageListContainer.appendChild(imageContainer)
    })
  })
})()
