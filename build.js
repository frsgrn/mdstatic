const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const parser = require('./parser')
const crawl = require('./utils/directory').crawl

module.exports = (source, dist) => {
    if (!fs.existsSync(source)) return
    var files = []
    crawl(source, files)
    if (fs.existsSync(dist)) rimraf.sync(dist)
    files.forEach(file => {
        const relPath = file.substring(file.indexOf(path.sep) + 1)
        const target = path.join(dist, relPath)
        const targetDirectory = target.substring(0, target.lastIndexOf(path.sep))

        if (!fs.existsSync(path.dirname(target))) {
            fs.mkdirSync(path.dirname(target), { recursive: true })
        }

        for (var i = 0; i < parser.parsers.length; i++) {
            if (parser.parsers[i].activator(file)) {
                parser.parseFile(file, targetDirectory, parser.parsers[i].parser)
                return
            }
        }

        fs.copyFileSync(file, target)
    })
}