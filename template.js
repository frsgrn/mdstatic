const fs = require('fs')
const path = require('path')
const crawl = require('./utils/directory').crawl
const config = require('./config')

const defaultValues = {
    "lang": config.getValue('default_lang'),
    "charset": config.getValue('default_charset'),
    "title": config.getValue('default_title'),
    "favicon": config.getValue('default_favicon')
}

module.exports = {
    loadTemplate(templateName) {
        let dir = path.join(__dirname, "/templates/", templateName)
        let realTemplateName = templateName
        if (templateName.charAt(0) == '~') {
            dir = path.join(config.getValue("build_template_folder"), templateName.substring(1))    
            realTemplateName = templateName.substring(1)
        }
        additionalFiles = []
        crawl(path.join(dir, "/assets"), additionalFiles)
        return {
            template: fs.readFileSync(path.join(dir, realTemplateName + ".template"), "utf-8"),
            additionalFiles: additionalFiles
        }
    },
    computeTemplate(template, data) {
        var computedTemplate = ""+template
        computedTemplate = this.insertData(data, computedTemplate)
        computedTemplate = this.insertData(defaultValues, computedTemplate)
        computedTemplate = computedTemplate.replace(new RegExp("{{.*}}", "g"), "")
        return computedTemplate
    },
    insertData(data, template) {
        var computedTemplate = ""+template
        Object.keys(data).forEach(function(key) {
            computedTemplate = computedTemplate.replace(new RegExp("{{" + key + "}}", 'g'), data[key])
        })
        return computedTemplate
    }
}