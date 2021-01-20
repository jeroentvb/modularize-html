const chalk = require('chalk')

module.exports = {
  CREATED_DIST: chalk.green('Created /dist folder'),
  CREATED_ASSETS: chalk.green('Created /dist/assets folder'),

  COPY_SUCCESFUL: (type) => chalk.green(`Copied ${type} to dist folder`),
  IMAGES_NOT_ENCODED_WEBP: chalk.yellow('Images not encoded to .webp as per build settings'),
  ENCODED_WEBP: chalk.green('Encoded images to .webp'),

  JS_NOT_MINIFIED: chalk.yellow('JS not minified as per build settings'),
  MINIFIED_JS: chalk.green('Minified JS'),
  CSS_NOT_MINIFIED: chalk.yellow('CSS not minfied as per build settings'),
  MINIFIED_CSS: chalk.green('Minified CSS'),
  CSS_ERROR: (err) => chalk.red(`The css could not be minified because of the following error: ${err}`),

  COMPILED_SUCCESSFULLY: chalk.green('Compiled succesfully'),

  GENERAL_ERR: (err) => chalk.red(err)
}
