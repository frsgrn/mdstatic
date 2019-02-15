const fs = require('fs')

module.exports = {
    defaultConfig: {
        build_target: "dist",
        build_source: 'static',
        build_template_folder: 'templates',
        serve_source: 'dist',
        serve_port: '8080',
        serve_error_redirect: '404.html',
        default_lang: 'en',
        default_charset: 'utf-8',
        default_title: 'mdstatic document',
        default_favicon: 'favicon.ico'
    },
    loadedConfig: {
    },
    getValue(key) {
        if (!this.loadedConfig[key] && this.defaultConfig[key]) {
            return this.defaultConfig[key]
        }
        else if (!this.loadedConfig[key] && !this.defaultConfig[key]) {
            return null
        }
        return this.loadedConfig[key]
    },
    loadConfig(configPath) {
        try {
            this.loadedConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"))
            console.log("Loaded " + configPath)
        } catch(e) {
        }
    }
}