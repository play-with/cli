const fs = require('fs')
const path = require('path')
const sinon = require('sinon')
const rimraf = require('rimraf')
const { expect } = require('chai')
const program = require('../lib/program')

describe('Program', () => {
  const dir = path.resolve(process.cwd(), '.playground')

  describe('Initialize playground', () => {
    const programArgs = ['node', 'lib/index.js', 'init']

    before(() => {
      program.parse(programArgs)
    })

    after(() => {
      rimraf.sync(dir)
    })

    it('should have init as the first argument', () => {
      expect(program.args[0]).to.eql('init')
    })

    it('should create .playground folder in current directory', () => {
      expect(fs.existsSync(dir)).to.eql(true)
    })

    it('should return successfully even when already setup', () => {
      const logSpy = sinon.spy(console, 'log')
      program.parse(programArgs)
      expect(logSpy.calledWith('> Playwith already setup, Skipping...')).to.eql(
        true
      )
      console.log.restore()
    })

    it('should log error if unable to setup', () => {
      sinon.stub(fs, 'mkdirSync').throws()
      const logSpy = sinon.spy(console, 'error')
      program.parse(programArgs)
      expect(
        logSpy.calledWith('Could not initialize playground in this directory')
      ).to.eql(true)
      console.error.restore()
      fs.mkdirSync.restore()
    })
  })

  describe('Running files', () => {
    const initPlaywithArgs = ['node', 'lib/index.js', 'init']

    before(() => {
      program.parse(initPlaywithArgs)
    })

    describe('File exists', () => {
      let logSpy
      const programArgs = ['node', 'lib/index.js', 'playwith-test-file']

      before(() => {
        logSpy = sinon.spy(console, 'error')
        program.parse(programArgs)
      })

      after(() => {
        console.error.restore()
      })

      it('should have the file as the argument', () => {
        expect(program.args[0]).to.eql('playwith-test-file')
      })

      it('should log cannot run file', () => {
        expect(
          logSpy.calledWith('> Cannot run playground file. Does not exist!')
        ).to.eql(true)
      })
    })

    describe('Playground does not exist', () => {
      const programArgs = ['node', 'lib/index.js', 'test1.js']

      before(() => {
        rimraf.sync(dir)
      })

      after(() => {
        program.parse(initPlaywithArgs)
      })

      it('should log playground not initialized', () => {
        const errorSpy = sinon.spy(console, 'error')
        program.parse(programArgs)
        expect(
          errorSpy.calledWith('> Playwith not initialized in this directory')
        ).to.eql(true)
        console.error.restore()
      })
    })

    xdescribe('Run file successfully', () => {
      const programArgs = ['node', 'lib/index.js', 'test1.js']

      before(() => {
        // const result = shell.exec(
        //   `echo "console.log('This is a test file')" >> ${dir}/test1.js`
        // )
        // console.log('===> result oo', result)
      })

      it('should run playground file successfully', () => {
        const logSpy = sinon.spy(console, 'log')
        program.parse(programArgs)
        expect(logSpy.calledWith('This is a test file')).to.eql(true)
        console.log.restore()
      })
    })
  })
})
