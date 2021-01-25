const app = require('express')
const chokidar = require('chokidar')
const watcher = chokidar.watch('./src', {
  ignored: /(^|[/\\])\../
})

const routes = require('./routes')

const server = app()
  .set('view engine', 'ejs')
  .set('views', 'src/pages')
  .use(app.static('src'))

  .use(routes)

  .use(notFound)
  .listen(3000, () => console.log(`[Server] listening on port 3000...`))

const io = require('socket.io')(server)

function notFound (_req, res) {
  res.status(404).send('404 not found')
}

watcher
  .on('add', _path => io.emit('reload'))
  .on('change', _path => io.emit('reload'))
  .on('unlink', _path => io.emit('reload'))
  .on('error', err => console.error('Error happened', err))
