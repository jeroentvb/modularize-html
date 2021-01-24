#!/usr/bin/env node

switch (process.argv[2]) {
  case 'serve': {
    require('../scripts/development/dev-server')
    break
  }

  case 'build': {
    const build = require('../scripts/build/build')
    build()

    break
  }

  case 'new-page': {
    const createNewPage = require('../scripts/development/newpage')
    const pageName = process.argv[3]

    createNewPage(pageName)

    break
  }

  case 'create-config': {
    const createConfig = require('../scripts/helper/create-config')
    createConfig()

    break
  }

  case undefined: {
    const chalk = require('chalk')
    const { APP_NAME } = require('../scripts/helper/messages')
    console.error(chalk.red(`${APP_NAME} no command specified!`))

    break
  }

  default: {
    const chalk = require('chalk')
    console.error(chalk.red(`${APP_NAME} invalid command`))

    break
  }
}
