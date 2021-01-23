const folderActions = require('./folder-actions')
const assets = require('./assets')
const minify = require('./minify')
const templates = require('./templates')

folderActions.removeDistFolder()
folderActions.createDistFolder()

assets.copy('fonts')
assets.copy('img')
assets.compileWebp()

minify.js()
minify.css()

templates.compile()
