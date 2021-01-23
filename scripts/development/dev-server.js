const app = require('express')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const watcher = chokidar.watch('./src', {
  ignored: /(^|[/\\])\../
})

const { CONFIG } = require('../helper/paths')

const config = require(CONFIG)

const frontendDevDependencies = {
  liveReload: `<script src="/socket.io.min.js"></script><script src="/live-reload.js"></script>`,
  removeWebp: config.development.removeWebpSources ? `<script src="/remove-webp.js"></script>` : ''
}

const server = app()
  .set('view engine', 'ejs')
  .set('views', 'src/pages')
  .use(app.static('src'))

  .get('/socket.io.min.js', getSocketIoClient)
  .get('/live-reload.js', getLiveReloadClient)
  .get('/remove-webp.js', getRemoveWebpFile)

  .get('/', index)
  .get('/:id', render)

  .use(notFound)
  .listen(3000, () => console.log(`[Server] listening on port 3000...`))

const io = require('socket.io')(server)

function index (_req, res) {
  res.render('index', {
    pagename: config.build.pageTitle.home + ' ' + config.build.pageTitle.suffix,
    frontendDevDependencies: frontendDevDependencies
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
  res.sendFile(path.join(__dirname, '/../../node_modules/socket.io/client-dist/socket.io.min.js'))
}

function getLiveReloadClient (_req, res) {
  res.sendFile(path.join(__dirname, './client-files/live-reload.js'))
}

function getRemoveWebpFile (_req, res) {
  res.sendFile(path.join(__dirname, './client-files/remove-webp.js'))
}

function notFound (_req, res) {
  res.status(404).send('404 not found')
}

watcher
  .on('add', _path => io.emit('reload'))
  .on('change', _path => io.emit('reload'))
  .on('unlink', _path => io.emit('reload'))
  .on('error', err => console.error('Error happened', err))
