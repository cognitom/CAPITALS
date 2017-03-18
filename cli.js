#!/usr/bin/env node
const capitals = require('./index.js')

if (process.argv.length < 4) {
  console.log('USAGE: capitals srcFile destFile')
} else {
  const srcFile = process.argv[2]
  const destFile = process.argv[3]
  capitals.compileFile(srcFile, destFile)
}
