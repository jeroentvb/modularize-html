const fs = require('fs')
const path = require('path')
const Router = require('express').Router

const { ROOT, CONFIG } = require('../helper/paths')
const config = require(CONFIG)

const frontendDevDependencies = {
  liveReload: `<script src="/socket.io.min.js"></script><script src="/live-reload.js"></script>`,
  removeWebp: config.development.removeWebpSources ? `<script src="/remove-webp.js"></script>` : ''
}

function index (_req, res) {
  res.render('index', {
    pagename: config.build.pageTitle.home + ' ' + config.build.pageTitle.suffix,
    frontendDevDependencies,
    ...config.customTemplateVariables
  })
}

function render (req, res) {
  if (config.development.staticSite && !req.url.includes('.html')) {
    res.send(`Please link your files including '.html'`)
    return
  }

  const id = req.url.replace('/', '').replace('.html', '')

  if (fs.existsSync(`src/pages/${id}.ejs`)) {
    res.render(id, {
      pagename: id.charAt(0).toUpperCase() + id.substr(1) + ' ' + config.build.pageTitle.suffix,
      frontendDevDependencies
    })
  } else {
    notFound(req, res)
  }
}

function getSocketIoClient (_req, res) {
  res.sendFile(path.join(ROOT, '/node_modules/socket.io/client-dist/socket.io.min.js'))
}

function getLiveReloadClient (_req, res) {
  res.sendFile(path.join(__dirname, './client-files/live-reload.js'))
}

function getRemoveWebpFile (_req, res) {
  res.sendFile(path.join(__dirname, './client-files/remove-webp.js'))
}

module.exports = Router()
  .get('/socket.io.min.js', getSocketIoClient)
  .get('/live-reload.js', getLiveReloadClient)
  .get('/remove-webp.js', getRemoveWebpFile)

  .get('/', index)
  .get('/:id', render)
