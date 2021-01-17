const fs = require('fs-extra')
const Terser = require('terser')
const postcss = require('postcss')
const cssnano = require('cssnano')

function js () {
  fs.readdir('./src/assets/js', (err, files) => {
    files.forEach(file => {
      if (err) throw new Error(err)
      if (!fs.existsSync('./dist/assets/js')) fs.mkdirSync('./dist/assets/js')

      fs.readFile(`./src/assets/js/${file}`, 'utf8', (err, data) => {
        if (err) throw new Error(err)

        const code = Terser.minify(data)

        fs.writeFile(`./dist/assets/js/${file}`, code.code, err => {
          if (err) {
            console.error(err)
          } else {
            console.log('Minified JS')
          }
        })
      })
    })
  })
}


function css () {
  fs.readdir('./src/assets/css', (err, files) => {
    if (err) throw new Error(err)
    if (!fs.existsSync('./dist/assets/css')) fs.mkdirSync('./dist/assets/css')

    files = files.filter(file => file.slice(-4) === '.css')

    files.forEach(file => {
      fs.readFile(`./src/assets/css/${file}`, 'utf8', (err, css) => {
        if (err) throw new Error(err)

        postcss([cssnano])
          .process(css, { from: undefined, to: undefined })
          .then(result => fs.writeFile(`./dist/assets/css/${file}`, result.css, () => true))
          .then(() => console.log('Minified CSS'))
          .catch(err => console.error(`The css could not be minified because of the following error: ${err}`))
      })
    })
  })
}

module.exports = {
  js,
  css
}
