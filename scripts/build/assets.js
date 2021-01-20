const fs = require('fs-extra')
const CWebp = require('cwebp').CWebp

const { IMAGES_NOT_ENCODED_WEBP, GENERAL_ERR, ENCODED_WEBP, COPY_SUCCESFUL } = require('./messages')
const { CONFIG, ASSETS_FOLDER_IMG, SRC_ASSETS_FOLDER } = require('./paths')

const config = require(CONFIG)

function copy (type) {
  fs.copySync(`${SRC_ASSETS_FOLDER}/${type}`, `${ASSETS_FOLDER_IMG}/${type}`)

  console.log(COPY_SUCCESFUL(type))
}

function compileWebp () {
  if (!config.build.encodeImagesWebp) return console.log(IMAGES_NOT_ENCODED_WEBP)

  const files = fs
    .readdirSync(ASSETS_FOLDER_IMG)
    .filter(image => image.includes('.jpg') || image.includes('.png'))

  files.forEach(image => {
    const fileName = image.split('.').splice(0, image.split('.').length - 1).join('.')
    const encoder = new CWebp(`${ASSETS_FOLDER_IMG}/${image}`)

    encoder.write(`${ASSETS_FOLDER_IMG}/${fileName}.webp`, err => {
      if (err) console.error(GENERAL_ERR(err))
    })
  })
  
  console.log(ENCODED_WEBP)
}

module.exports = {
  copy,
  compileWebp
}
