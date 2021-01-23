const ROOT = process.env.PWD

const CONFIG = ROOT + '/modular-html-config.json'

const DIST_FOLDER = ROOT + '/dist'

const ASSETS_FOLDER = DIST_FOLDER + '/assets'
const ASSETS_FOLDER_IMG = ASSETS_FOLDER + '/img'
const ASSETS_FOLDER_JS = ASSETS_FOLDER + '/js'
const ASSETS_FOLDER_CSS = ASSETS_FOLDER + '/css'

const SRC_ASSETS_FOLDER = ROOT + '/src/assets'
const SRC_PAGES_FOLDER = ROOT + '/src/pages'

module.exports = {
  CONFIG,
  DIST_FOLDER,
  ASSETS_FOLDER,
  ASSETS_FOLDER_IMG,
  ASSETS_FOLDER_JS,
  ASSETS_FOLDER_CSS,
  SRC_ASSETS_FOLDER,
  SRC_PAGES_FOLDER
}
