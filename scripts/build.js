const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const Terser = require('terser')
const postcss = require('postcss')
const cssnano = require('cssnano')

function createDistFolder () {
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
    console.log('Created /dist folder')
  }
  if (!fs.existsSync('./dist/assets')) {
    fs.mkdirSync('./dist/assets')
    console.log('Created /dist/assets folder')
  }
}

function copyAssets (type) {
  fs.copy(`./src/assets/${type}`, `./dist/assets/${type}`, err => {
    if (err) {
      console.error(`${type} could not be copied because of the following error: ${err}`)
    } else {
      console.log(`Succesfully copied ${type}`)
    }
  })
}

function compileTemplates () {
  fs.readdir('./src/pages/', (err, files) => {
    if (err) throw new Error(err)

    files.forEach(file => {
      fs.readFile(path.resolve(`./src/pages/${file}`), 'utf8', (err, data) => {
        if (err) console.error(err)

        let template = ejs.compile(data, {
          filename: `./src/pages/${file}`
        })

        const name = file === 'index.ejs' ? 'Home' : file.charAt(0).toUpperCase() + file.substr(1).replace('.ejs', '')
        const html = template({
          pagename: name
        })

        fs.writeFile(`./dist/${file.replace('.ejs', '')}.html`, html, err => {
          if (err) {
            console.error(err)
          } else {
            console.log('Compiled succesfully')
          }
        })
      })
    })
  })
}

const minify = {
  js: () => {
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
  },
  css: () => {
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
}

createDistFolder()
copyAssets('fonts')
copyAssets('img')
minify.js()
minify.css()
compileTemplates()
