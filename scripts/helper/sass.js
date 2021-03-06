const fs = require('fs')
const sass = require('sass')

const { SRC_ASSETS_FOLDER } = require('./paths')

const { COMPILED_SCSS } = require('./messages')

function watch () {
  const chokidar = require('chokidar')
  const sassWatcher = chokidar.watch('./src/assets/css/**/*.scss', {
    ignoreInitial: true
  })

  sassWatcher
    .on('add', _path => compile())
    .on('change', _path => compile())
    .on('unlink', _path => compile())
    .on('error', err => console.error('Error happened', err))
}

function compile (verbose = false) {
  try {
    const result = sass.renderSync({
      file: `${SRC_ASSETS_FOLDER}/css/styles.scss`
    })

    fs.writeFileSync(`${SRC_ASSETS_FOLDER}/css/styles.css`, result.css)

    if (verbose) console.log(COMPILED_SCSS)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  watch,
  compile
}
