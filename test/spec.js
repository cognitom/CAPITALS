const assert = require('assert')
const fs = require('fs')
const path = require('path')
const capitals = require('../')

describe('CAPITALS', () => {
  it('compiles HELLO.js', () => {
    const filename = 'HELLO.js'
    const result = compile(`fixture/${filename}`)
    assert.equal(result.code, read(`expect/${filename.toLowerCase()}`))
  })

  it('generates a source map for HELLO.js', () => {
    const filename = 'HELLO.js'
    const result = compile(`fixture/${filename}`)
    assert.equal(result.map, read(`expect/${filename.toLowerCase()}.map`))
  })
})

function compile (filename, code) {
  return capitals.compile(`../${filename}`, read(filename))
}

function read (file) {
  try {
    return fs.readFileSync(path.join(__dirname, file), 'utf8')
  } catch (err) {
    return ''
  }
}
