const path = require('path');
const fs = require('fs');
const { minify } = require("terser");

class HummerLoadScript {
  constructor(options) {
    this.infix = options.infix || 'main'
  }

  apply(compiler) {
    let assetEmittedFiles = []
    let infix = this.infix

    compiler.hooks.thisCompilation.tap(
      'HummerLoadScript',
      (compilation) => {
        assetEmittedFiles = []
      }
    )

    compiler.hooks.assetEmitted.tap(
      'HummerLoadScript',
      (file, info) => {
        // 收集这次编译流程中被输出的文件 用于标识afterEmit钩子中哪些入口需要重新rename和重新生成
        assetEmittedFiles.push(file)
      }
    );
    
    compiler.hooks.afterEmit.tap(
      'HummerLoadScript',
      (compilation) => {
        
        let entryArr = Array.from(compilation.entries.keys())

        entryArr.forEach(entry => {
          let files = compilation.entrypoints.get(entry).getFiles()

          // 获取入口文件对应的chunk
          let entrypointChunk = compilation.entrypoints.get(entry).getEntrypointChunk()
          let entrypointChunkFile = Array.from(entrypointChunk.files)[0]
          if(!assetEmittedFiles.includes(entrypointChunkFile)) {
            return false
          }
          // 重命名已经生成的文件 index.js => index.main.js
          let originTargetPath = path.resolve(compilation.outputOptions.path, entrypointChunkFile);
          let originTargetPathObj = path.parse(originTargetPath)

          fs.access(originTargetPath, fs.constants.F_OK, err => {
            if (!err) {
              fs.rename(originTargetPath, path.resolve(compilation.outputOptions.path, `${originTargetPathObj.name}.${infix}.js`), err=>{
                if (!err) {
                  // 生成新的入口文件 index.js
                  let fileContent = ''
                  files.forEach(file => {
                    let tPath = `.${path.sep}${file}`
                    if (file === originTargetPathObj.base) {
                      tPath = `.${path.sep}${originTargetPathObj.name}.${infix}.js`
                    }
                    fileContent = `
                      Hummer.loadScriptWithUrl('${tPath}', function () {
                        ${fileContent}
                      })
                    `
                  });
                  minify({
                    [originTargetPathObj.base]: fileContent
                  }).then(res => {
                    fileContent = res.code;
                    fs.writeFileSync(originTargetPath, fileContent);
                  })
                }
              })
            }
          })
        })
      }
    );
  }
}

module.exports = HummerLoadScript