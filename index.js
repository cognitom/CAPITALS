const fs = require('fs')
const path = require('path')
const SourceMapGenerator = require('source-map').SourceMapGenerator

/**
 * Compiles CAPITALS to JavaScript
 * @param {string} srcFile - source file path
 * @param {string} srcCode - content of srcFile
 * @param {string} destFileName - if not given, srcFile's basename will be used
 */
function compile (srcFile, srcCode, destFileName) {
  destFileName = destFileName || path.basename(srcFile).toLowerCase()

  const gen = new SourceMapGenerator({ file: destFileName })
  gen.setSourceContent(srcFile, srcCode)
  const code = srcCode
    .split('\n')
    .map((line, idx) => {
      gen.addMapping({
        source: srcFile,
        original: { line: idx + 1, column: 0 },
        generated: { line: idx + 1, column: 0 }
      })
      return line.toLowerCase()
    })
    .join('\n')

  return {
    code: code + `\n//# sourceMappingURL=${destFileName}.map`,
    map: gen.toString()
  }
}

/**
 * Compiles and exports CAPITALS to files
 * @param {string} srcFile - source file path
 * @param {string} destFile - destination file path
 */
function compileFile (srcFile, destFile) {
  const srcCode = fs.readFileSync(srcFile, 'utf8')
  const srcFileRelative = path.relative(path.dirname(destFile), srcFile)
  const destFileName = path.basename(destFile)
  const result = compile(srcFileRelative, srcCode, destFileName)

  fs.writeFileSync(destFile, result.code)
  fs.writeFileSync(destFile + '.map', result.map)
}

module.exports = {
  compile,
  compileFile
}
