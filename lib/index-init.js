const fs = require('fs')
const path = require('path')

module.exports = _ => {
  try {
    const dir = `${path.resolve(process.cwd(), '.playground')}`
    fs.mkdirSync(dir)
    console.log('> Initialized Playground')
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error('Could not initialize playground in this directory')
    } else {
      console.log('> Playwith already setup, Skipping...')
    }
  }
}
