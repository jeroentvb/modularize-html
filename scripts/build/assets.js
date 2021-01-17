const fs = require('fs-extra')
const CWebp = require('cwebp').CWebp

function copy (type) {
  fs.copySync(`./src/assets/${type}`, `./dist/assets/${type}`)

  console.log(`Succesfully copied ${type}`)
}

function compileWebp () {
  const files = fs
    .readdirSync('./dist/assets/img')
    .filter(image => image.includes('.jpg') || image.includes('.png'))

  files.forEach(image => {
    const fileName = image.split('.').splice(0, image.split('.').length - 1).join('.')
    const encoder = new CWebp(`./dist/assets/img/${image}`)

    encoder.write(`./dist/assets/img/${fileName}.webp`, err => {
      if (err) console.error(err)
    })
  })
  
  console.log('Encoded images to .webp')
}

module.exports = {
  copy,
  compileWebp
}
