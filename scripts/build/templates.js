const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')

const { COMPILED_SUCCESSFULLY } = require('./messages')
const { DIST_FOLDER, SRC_PAGES_FOLDER } = require('./paths')

function compile () {
  fs.readdir(`${SRC_PAGES_FOLDER}/`, (err, files) => {
    if (err) throw new Error(err)

    files.forEach(file => {
      fs.readFile(path.resolve(`${SRC_PAGES_FOLDER}/${file}`), 'utf8', (err, data) => {
        if (err) console.error(err)

        let template = ejs.compile(data, {
          filename: `./src/pages/${file}`
        })

        const name = file === 'index.ejs' ? 'Home' : file.charAt(0).toUpperCase() + file.substr(1).replace('.ejs', '')
        const html = template({
          pagename: name,
          frontendDevDependencies: ''
        })

        fs.writeFile(`${DIST_FOLDER}/${file.replace('.ejs', '')}.html`, html, err => {
          if (err) {
            console.error(err)
          } else {
            console.log(COMPILED_SUCCESSFULLY)
          }
        })
      })
    })
  })
}

module.exports = {
  compile
}
