const fs = require('fs-extra')

function readDir (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)

      resolve(files)
    })
  })
}

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, fileContents) => {
      if (err) reject(err)

      resolve(fileContents)
    })
  })
}

function writeFile (path, fileContents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, fileContents, (err) => {
      if (err) reject(err)

      resolve()
    })
  })
}

module.exports = {
  readDir,
  readFile,
  writeFile
}
