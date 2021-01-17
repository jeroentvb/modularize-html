const folderActions = require('./build/folder-actions')
const assets = require('./build/assets')
const minify = require('./build/minify')
const templates = require('./build/templates')

folderActions.removeDistFolder()
folderActions.createDistFolder()

assets.copy('fonts')
assets.copy('img')
assets.compileWebp()

minify.js()
minify.css()

templates.compile()
