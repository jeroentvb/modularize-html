const fs = require('fs-extra')
const CWebp = require('cwebp').CWebp

const messages = require('./messages')
const config = require('../../modular-html-config.json')

function copy (type) {
  fs.copySync(`./src/assets/${type}`, `./dist/assets/${type}`)

  console.log(messages.COPY_SUCCESFUL(type))
}

function compileWebp () {
  if (!config.build.encodeImagesWebp) return console.log(messages.IMAGES_NOT_ENCODED_WEBP)

  const files = fs
    .readdirSync('./dist/assets/img')
    .filter(image => image.includes('.jpg') || image.includes('.png'))

  files.forEach(image => {
    const fileName = image.split('.').splice(0, image.split('.').length - 1).join('.')
    const encoder = new CWebp(`./dist/assets/img/${image}`)

    encoder.write(`./dist/assets/img/${fileName}.webp`, err => {
      if (err) console.error(messages.GENERAL_ERR(err))
    })
  })
  
  console.log(messages.ENCODED_WEBP)
}

module.exports = {
  copy,
  compileWebp
}
