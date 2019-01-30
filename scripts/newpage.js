const fs = require('fs')
const fileName = process.argv[2]
const contents = `<%- include('../partials/head') %>



<%- include('../partials/tail') %>`

if (!fileName) throw new Error('No filename specified!')

fs.writeFile(`src/pages/${fileName}.ejs`, contents, err => {
  if (err) throw new Error(err)
  console.log(`Succesfully created ${fileName}.ejs in src/pages/`)
})
