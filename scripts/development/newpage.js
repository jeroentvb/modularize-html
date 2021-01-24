const fs = require('fs')
const contents = `<%- include('../partials/head') %>



<%- include('../partials/tail') %>`

function createNewPage (fileName) {
  if (!fileName) throw new Error('No filename specified!')

  fs.writeFile(`src/pages/${fileName}.ejs`, contents, err => {
    if (err) throw new Error(err)
    console.log(`Succesfully created ${fileName}.ejs in src/pages/`)
  })
}

module.exports = createNewPage
