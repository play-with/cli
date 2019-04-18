const program = require('commander')
const executeFile = require('./execute-file')
const packageJson = require('../package.json')
const initializePlayground = require('./index-init')

program
  .version(packageJson.version)
  .command('init', 'initialize playwith in directory')
  .action(args => {
    switch (args) {
      case 'init':
        initializePlayground()
        break
      default:
        executeFile(args)
    }
  })

module.exports = program
