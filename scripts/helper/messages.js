const chalk = require('chalk')

const APP_NAME = '[modularize-html]'

module.exports = {
  APP_NAME,

  CREATED_DIST: chalk.green(`${APP_NAME} created /dist folder`),
  CREATED_ASSETS: chalk.green(`${APP_NAME} created /dist/assets folder`),

  COPY_SUCCESFUL: (type) => chalk.green(`${APP_NAME} copied ${type} to dist folder`),
  IMAGES_NOT_ENCODED_WEBP: chalk.yellow(`${APP_NAME} images not encoded to .webp as per build settings`),
  ENCODED_WEBP: chalk.green(`${APP_NAME} encoded images to .webp`),

  JS_NOT_MINIFIED: chalk.yellow(`${APP_NAME} JS not minified as per build settings`),
  MINIFIED_JS: chalk.green(`${APP_NAME} minified JS`),
  CSS_NOT_MINIFIED: chalk.yellow(`${APP_NAME} CSS not minfied as per build settings`),
  MINIFIED_CSS: chalk.green(`${APP_NAME} minified CSS`),
  COMPILED_SCSS: chalk.green(`${APP_NAME} compiled SCSS`),
  CSS_ERROR: (err) => chalk.red(`${APP_NAME} the css could not be minified because of the following error: ${err}`),

  COMPILED_TEMPLATES_SUCCESSFULLY: chalk.green(`${APP_NAME} compiled .ejs templates succesfully`),

  COMPILED_SUCCESSFULLY: chalk.green(`${APP_NAME} compiled successfully`),

  GENERAL_ERR: (err) => chalk.red(err),

  CONFIG_CREATED: chalk.green(`${APP_NAME} config created`),
  CONFIG_NOT_CREATED: chalk.yellow(`${APP_NAME} config not created, because it already exists`)
}
