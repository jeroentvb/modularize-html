const fs = require('fs-extra')
const CWebp = require('cwebp').CWebp

const { readDir } = require('../helper/fs-wrapper')

const { IMAGES_NOT_ENCODED_WEBP, GENERAL_ERR, ENCODED_WEBP, COPY_SUCCESFUL } = require('../helper/messages')
const { CONFIG, ASSETS_FOLDER_IMG, SRC_ASSETS_FOLDER } = require('../helper/paths')

const config = require(CONFIG)

async function copy (type) {
  await fs.copy(`${SRC_ASSETS_FOLDER}/${type}`, `${ASSETS_FOLDER_IMG}/${type}`)

  console.log(COPY_SUCCESFUL(type))
}

async function compileWebp () {
  if (!config.build.encodeImagesWebp) return console.log(IMAGES_NOT_ENCODED_WEBP)

  try {
    const files = await readDir(ASSETS_FOLDER_IMG)
    const filteredFiles = files.filter(image => image.includes('.jpg') || image.includes('.png'))

    await Promise.all(filteredFiles.map(async (image) => {
      const fileName = image.split('.').splice(0, image.split('.').length - 1).join('.')
      const encoder = new CWebp(`${ASSETS_FOLDER_IMG}/${image}`)

      await encoder.write(`${ASSETS_FOLDER_IMG}/${fileName}.webp`)
    }))

    console.log(ENCODED_WEBP)
  } catch (err) {
    console.error(GENERAL_ERR(err))
  }
}

module.exports = {
  copy,
  compileWebp
}
