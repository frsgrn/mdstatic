const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

function crawl(dir, result) {
    if (!fs.existsSync(dir)) return;
        if (result == null || result.constructor != Array) result = [];
        var files = fs.readdirSync(dir)
        for (var x in files) {
            var next = path.join(dir, files[x])
            if (fs.lstatSync(next).isDirectory() == true) {
                crawl(next, result)
            }
            else {
                result.push(next)
            }
        }
}

module.exports = {
    crawl,
    moveFiles(files, targetDirectory) {
        if(!files) return
        files.forEach((file) => {
            let filename = file.replace(/^.*[\\\/]/, '')
            fs.copyFileSync(file, path.join(targetDirectory, filename))
        })
    }
}