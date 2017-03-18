const path = require('path')
const capitals = require('../')

compile('fixture/HELLO.js', 'expect/hello.js')

function compile (srcFile, destFile) {
  capitals.compileFile(path.join(__dirname, srcFile), path.join(__dirname, destFile))
}
