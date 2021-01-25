const path = require('path')
const ejs = require('ejs')

const { readDir, readFile, writeFile } = require('../helper/fs-wrapper')
const { COMPILED_TEMPLATES_SUCCESSFULLY } = require('../helper/messages')
const { DIST_FOLDER, SRC_PAGES_FOLDER, CONFIG } = require('../helper/paths')

const config = require(CONFIG)

async function compile () {
  try {
    const files = await readDir(`${SRC_PAGES_FOLDER}/`)

    await Promise.all(files.map(async (file) => {
      const fileContents = await readFile(path.resolve(`${SRC_PAGES_FOLDER}/${file}`))

      const template = ejs.compile(fileContents, {
        filename: `./src/pages/${file}`
      })

      const pageName = file.charAt(0).toUpperCase() + file.substr(1).replace('.ejs', '') + ' ' + config.build.pageTitle.suffix
      const name = file === 'index.ejs' ? config.build.pageTitle.home + ' ' + config.build.pageTitle.suffix : pageName
      
      const html = template({
        pagename: name,
        frontendDevDependencies: '',
        ...config.customTemplateVariables
      })

      await writeFile(`${DIST_FOLDER}/${file.replace('.ejs', '')}.html`, html)
    }))

    console.log(COMPILED_TEMPLATES_SUCCESSFULLY)
  } catch (err) {
    throw err
  }
}

module.exports = {
  compile
}
