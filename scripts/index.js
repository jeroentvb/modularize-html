const app = require('express')
const fs = require('fs')

app()
  .set('view engine', 'ejs')
  .set('views', 'src/pages')
  .use(app.static('src'))

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
  if (!req.url.includes('.html')) {
    console.log(`Please link your files including '.html'`)
    res.send(`Please link your files including '.html'`)
    return
  }

  const id = req.url.replace('/', '').replace('.html', '')

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
