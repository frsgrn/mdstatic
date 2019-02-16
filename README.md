# mdstatic
[quickstart](https://github.com/frsgrn/mdstatic-quickstart)

mdstatic is a command-line interface made for converting markdown files to html files.
## where do i put my markdown files?
The default directory that the cli will use when building the static files is ```src/``` (changeable in config.js).
And the cli will output the results to ```dist/``` (changeable in config.js)

Not only will the cli convert the markdown files to html files,
it will also copy all other files and directories from the ```src/``` to the ```dist/``` folder. 
Essentially just turning the markdown files to html files while keeping the already existing files intact.
## layout of a markdown file
```markdown
---
// all meta-data and variables are declared inside of here
// note -> if a key is missing it will use the default value declared in the config.json or the cli default
// (keys and default values)
title: "mdstatic document"
template: "default"
lang: "en"
description: ""
author: ""
keywords: ""
charset: "utf-8"
favicon: "favicon.ico"
---
// content
# this is a header
And this is normal text
```
## config
To create a configuration file create a file called ```config.js``` in your directory.
### config keys and default values
```json
{
  "build_target": "dist",
  "build_source": "src",
  "build_template_folder": "templates",
  "serve_source": "dist",
  "serve_port": "8080",
  "serve_error_redirect": "404.html",
  "default_lang": "en",
  "default_charset": "utf-8",
  "default_title": "mdstatic document",
  "default_favicon": "favicon.ico"
}
```
## templates
Tired of the default layout? Create your own.
1. Create a folder named ```templates/```
2. Create another folder with the name of your template ```templates/your_template```
3. Create a file with your ```template name + .template``` inside your template folder ```templates/your_template/your_template.template```
4. To use your own template inside of your markdown files add this to the meta-data section of the markdown file ```template: "~your_template"```
### layout of the default template file
Variables that you want to be changeable by the meta-data inside the markdown-files are surrounded by ```{{variable_name}}```
```html
<html lang="{{lang}}">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="style.css">
        <meta name="description" content="{{description}}">
        <meta name="author" content="{{author}}">
        <meta name="keywords" content="{{keywords}}">
        <meta charset="{{charset}}">
        <link rel="icon" href="{{favicon}}" type="image/x-icon"/>
        <title>{{title}}</title>
    </head>
    <body>
        <div class="container">
            {{content}}
        </div>
    </body>
</html>
```
## known issues
* none
