#!/usr/bin/env node

switch (process.argv[2]) {
  case 'serve': {
    require('../scripts/development/dev-server')
    break
  }

  case 'build': {
    require('../scripts/build/build')
    break
  }

  case 'new-page': {
    require('../scripts/development/newpage')
    break
  }

  case 'create-config': {
    const createConfig = require('../scripts/helper/create-config')

    createConfig()

    break
  }

  case undefined: {
    console.error('No command specified!')
    break
  }

  default: {
    console.error('Invalid command!')
    break
  }
}
