(function () {
  'use strict'
  function ivySearch (keyword) {
    let queries = {}
    let topbar = document.getElementById('topabar')
    if (!topbar) {
      return false
    }
    if (!keyword) {
      let queryText = window.location.search
      if (window.location.hash.match(/q=/)) {
        queryText = window.location.hash
      }
      queryText.substr(1).split('&').forEach(function (item) {
        let tmp = item.split('=')
        queries[tmp[0]] = tmp[1]
      })
      keyword = queries.q
    }
    let ivySearchContainer = document.querySelector('.gyoogle-ivysearch-container')
    if (ivySearchContainer) {
      ivySearchContainer.innerHTML = ''
    } else {
      ivySearchContainer = document.createElement('div')
      ivySearchContainer.className = 'gyoogle-ivysearch-container'
      ivySearchContainer.style.margin = '0 20px'
      ivySearchContainer.style.borderBottom = '1px solid rgba(0, 0, 0, 0.07)'
      ivySearchContainer.style.paddingBottom = '5px'
      topbar.appendChild(ivySearchContainer)
    }
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

    chrome.runtime.sendMessage({keyword}, function (response) {
      const images = JSON.parse(response)
      if (images.length === 0) {
        imageListContainer.innerText = 'There is no image about such keyword.'
        ivySearchContainer.appendChild(imageListContainer)
      } else {
        imageListContainer.style.height = '110px'
        imageListContainer.style.overflowY = 'scroll'
        ivySearchContainer.appendChild(imageListContainer)
        images.slice(0, 24).forEach(function (item) {
          let imageContainer = document.createElement('span')
          imageContainer.style.margin = '0 3px'
          imageContainer.innerHTML = `
          <a href='${item.permalink_url}' target='_blank'>
          <img src='${item.search_thumb_url}' />
          </a>
          `
          imageListContainer.appendChild(imageContainer)
        })
      }
    })
  }
  let oldKeyword = ''
  let newKeyword = ''
  // 入力されている検索キーワードが変更されている OR ivySearchが出ていない
  // どちらかを満たす時に表示させる
  // XXX: 良い感じのイベントハンドラを選ぶのが大変なのでとりあえずsetIntervalで監視する
  window.setInterval(function () {
    newKeyword = document.getElementById('lst-ib').value
    if (oldKeyword !== newKeyword) {
      oldKeyword = newKeyword
      ivySearch()
    } else if (!document.getElementById('topabar').textContent.match(/ivysearch/i)) {
      ivySearch()
    }
  }, 500)
})()
