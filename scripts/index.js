const app = require('express')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const watcher = chokidar.watch('./src', {
  ignored: /(^|[/\\])\../
})

const frontendDevDependencies = {
  liveReload: `<script src="/socket.io.min.js"></script><script src="/devDependencies/live-reload.js"></script>`,
  removeWebp: `<script src="/devDependencies/remove-webp.js"></script>`
}

const server = app()
  .set('view engine', 'ejs')
  .set('views', 'src/pages')
  .use(app.static('src'))

  .get('/socket.io.min.js', getSocketIoClient)

  .get('/', index)
  .get('/:id', render)

  .use(notFound)
  .listen(3000, () => console.log(`[Server] listening on port 3000...`))

const io = require('socket.io')(server)

function index (_req, res) {
  res.render('index', {
    pagename: 'Home',
    frontendDevDependencies: frontendDevDependencies
  })
}

function render (req, res) {
  if (!req.url.includes('.html')) {
    // console.log(`Please link your files including '.html'`)
    res.send(`Please link your files including '.html'`)
    return
  }

  const id = req.url.replace('/', '').replace('.html', '')

  if (fs.existsSync(`src/pages/${id}.ejs`)) {
    res.render(id, {
      pagename: id.charAt(0).toUpperCase() + id.substr(1),
      frontendDevDependencies
    })
  } else {
    notFound(req, res)
  }
}

function getSocketIoClient (_req, res) {
  res.sendFile(path.join(__dirname, '/../node_modules/socket.io/client-dist/socket.io.min.js'));
}

function notFound (_req, res) {
  res.status(404).send('404 not found')
}

watcher
  .on('add', _path => io.emit('reload'))
  .on('change', _path => io.emit('reload'))
  .on('unlink', _path => io.emit('reload'))
  .on('error', err => console.error('Error happened', err))
