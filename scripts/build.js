const folderActions = require('./build/folder-actions')
const copyActions = require('./build/copy-actions')
const minify = require('./build/minify')
const templates = require('./build/templates')

folderActions.removeDistFolder()
folderActions.createDistFolder()

copyActions.copyAssets('fonts')
copyActions.copyAssets('img')

minify.js()
minify.css()

templates.compile()
