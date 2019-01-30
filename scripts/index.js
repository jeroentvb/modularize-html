const express = require('express')
const fs = require('fs')

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'src/pages')
  .use(express.static('src'))
  .get('/', index)
  .get('/:id', render)
  .use(notFound)
  .listen(3000, () => console.log(`[Server] listening on port 3000...`))

function index (req, res) {
  res.render('index', {
    pagename: 'Home'
  })
}

function render (req, res) {
  let id = req.url.replace('/', '')

  if (fs.existsSync(`src/pages/${id}.ejs`)) {
    res.render(id, {
      pagename: id.charAt(0).toUpperCase() + id.substr(1)
    })
  } else {
    notFound(req, res)
  }
}

function notFound (req, res) {
  res.status(404).send('404 not found')
}
