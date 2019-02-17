const fs = require('fs')
const path = require('path')
const crawl = require('./utils/directory').crawl
const config = require('./config')
const compiler = require('./compiler')

const defaultValues = {
    "lang": config.getValue('default_lang'),
    "charset": config.getValue('default_charset'),
    "title": config.getValue('default_title'),
    "favicon": config.getValue('default_favicon')
}

module.exports = {
    loadTemplate(templateName) {
        let dir = path.join("templates/", templateName)
        additionalFiles = []
        crawl(path.join(dir, "/assets"), additionalFiles)
        return {
            template: fs.readFileSync(path.join(dir, templateName + ".template"), "utf-8"),
            additionalFiles: additionalFiles
        }
    },
    computeTemplate(template, data) {
        var computedTemplate = ""+template

        Object.keys(defaultValues).forEach(key => {
            if (!data[key]) data[key] = defaultValues[key]
        })

        computedTemplate = computedTemplate.replace(new RegExp("{{([^]+?)}}", 'g'), function(a, b) {
            try {
                return compiler.compileString(b, data)
            } catch (e) {
                return ""
            }
        })
        return computedTemplate
    }
}