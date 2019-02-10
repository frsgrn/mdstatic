const Config = require('./config')
const metaMarked = require('meta-marked')

const fs = require('fs')
const path = require('path')

module.exports = {
    parsers: [
        {
            parser (fileContents) {
                let md = metaMarked(fileContents)
                return {
                    fileType: "html",
                    fileContents: md.html.trim()
                }
            },
            activator(file) {
                return file.split('.').pop() == "md"
            }
    }   
    ],
    /*mdToHtml(mdString, config) {
        var md = metaMarked(mdString)
        var head = this.configToHead(config, md.meta)
        return `<html>
    <head>
        ${head.trim()}
    </head>
    <body>
        <div class="container">
            ${md.html.trim()}
        </div>
    </body>
</html>`
    },
    
    configToHead(localConfig, mdConfig) {
        var newConfig = Config.compareConfig(Config.defaultConfig, localConfig)
        newConfig = Config.compareConfig(newConfig, mdConfig)
        return `<meta data-n-head="true" content="${newConfig.description}" name="description" data-hid="description"></meta>
        <title data-n-head="true">${newConfig.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" data-n-head="true">
        `
    },*/

    parseFile(source, targetDirectory, parser) {
        const filename = source.split("\\").slice(-1).pop()
        const parsed = parser(fs.readFileSync(source, "utf-8"), Config.defaultConfig)
        fs.writeFileSync(path.join(targetDirectory, filename.replace(/\.[^\.]+$/, "." + parsed.fileType)), parsed.fileContents, "utf-8")
        
    }
}