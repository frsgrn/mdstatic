const Config = require('./config')
const metaMarked = require('meta-marked')
const Template = require('./template')

const fs = require('fs')
const path = require('path')

const directoryUtils = require('./utils/directory')

module.exports = {
    parsers: [
        {
            parser(fileContents) {
                let md = metaMarked(fileContents)
                let template = null
                let data = {}

                if (md.meta && md.meta.template) {
                    template = Template.loadTemplate(md.meta.template)
                    data = md.meta
                }

                data.content = md.html.trim()
                
                if (template) {
                    return {
                        fileType: "html",
                        fileContents: Template.computeTemplate(template.template, data),
                        additionalFiles: template.additionalFiles
                    }
                }
                else {
                    return {
                        fileType: "html",
                        fileContents: data.content
                    }
                }
            },
            activator(file) {
                return file.split('.').pop() == "md"
            }
        }
    ],
    parseFile(source, targetDirectory, parser) {
        const filename = source.split(path.sep).slice(-1).pop()
        const parsed = parser(fs.readFileSync(source, "utf-8"))
        fs.writeFileSync(path.join(targetDirectory, filename.replace(/\.[^\.]+$/, "." + parsed.fileType)), parsed.fileContents, "utf-8")
        if (parsed.additionalFiles) directoryUtils.moveFiles(parsed.additionalFiles, targetDirectory);
    }
}