const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

module.exports = filename => {
  const BASE_DIR = path.resolve(process.cwd(), '.playground')
  const playgroundExists = fs.existsSync(BASE_DIR)
  const fileExists = fs.existsSync(path.resolve(BASE_DIR, `${filename}`))

  if (!playgroundExists) {
    console.error('> Playwith not initialized in this directory')
    return
  }

  if (!fileExists) {
    console.error('> Cannot run playground file. Does not exist!')
    return
  }

  return execSync(`node .playground/${filename}`)
}
