#!/usr/bin/env node
const express = require('express')
const build = require('./build')
const config = require('./config')

var program = require('commander')

config.loadConfig("config.json")

program
.version('1.0.3')
.name("mdstatic")

program.command('build')
.description("build static assets")
.option('-t, --target <target>', 'set build target')
.option('-s, --source <source>', 'set build source')
.action(function(cmd) {
    const buildSouce = (cmd.source ? cmd.source : config.getValue('build_source'))
    const buildTarget = (cmd.target ? cmd.target : config.getValue('build_target'))
    console.log("Building from " + buildSouce + " to " + buildTarget)
    build(buildSouce, buildTarget)
    console.log("Build completed")
})

program.command('serve')
.description('serve static content')
.option('-s --source <source>', 'source to serve from')
.option('-p, --port <port>')
.action(function(cmd) {
    const port = (cmd.port ? cmd.port : config.getValue('serve_port'))
    var app = express()
    app.use(express.static((cmd.source ? cmd.source : config.getValue('serve_source'))))
    app.use((req, res) => {
        res.redirect(config.getValue('serve_error_redirect'))
    })
    app.listen(port)
    console.log("Live on port: " + port)
})

program.parse(process.argv)