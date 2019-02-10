#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const parser = require('./parser')

const config = require('./config')

function crawl(dir, result) {
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

function generate(source, dist) {
    var files = []
    crawl(source, files)
    if (fs.existsSync(dist)) rimraf.sync(dist)
    files.forEach(file => {
        const relPath = file.substring(file.indexOf("\\") + 1)
        const target = path.join(dist, relPath)
        const targetDirectory = target.substring(0, target.lastIndexOf("\\"))

        if (!fs.existsSync(path.dirname(target))) {
            fs.mkdirSync(path.dirname(target), { recursive: true })
        }

        for(var i = 0; i < parser.parsers.length; i++) {
            if (parser.parsers[i].activator(file)) {
                parser.parseFile(file, targetDirectory, parser.parsers[i].parser)
                return
            }
        }

        fs.copyFileSync(file, target)
    })
}

config.loadConfig("./config.json")
generate("./tset", "./dist")
generate("./assets", "./dist/assets")

// console.log(mdToHtml("# Hello"))