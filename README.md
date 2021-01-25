[![npm version](https://badge.fury.io/js/modularize-html.svg)](https://badge.fury.io/js/modularize-html)

# Modularize html
This CLI package uses [ejs](https://ejs.co/#docs) to allow building a static website from modular ejs (HTML) files. The main goal is to enable a developers to create a static site in a modular way. It's also meant to be as simple as possible, while applying some best practices at build.   
It can also minify js & css, and encode png and jpeg files to webp on build.

Also check out the [boiler plate repo](https://github.com/jeroentvb/modularize-html-boilerplate) which uses this package.

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Config](#config)
  + [build.minify.js](#buildminifyjs)
  + [build.minify.css](#buildminifycss)
  + [build.encodeImagesWebp](#buildencodeimageswebp)
  + [build.pageTitle.home](#buildpagetitlehome)
  + [build.pageTitle.suffix](#buildpagetitlesuffix)
  + [development.removeWebpSources](#developmentremovewebpsources)
  + [development.staticSite](#developmentstaticsite)
  + [development.customTemplateVariables](#developmentcustomtemplatevariables)
* [Development](#development)
  + [New page](#new-page)
  + [Page titles](#page-titles)
  + [webp images](#webp-images)
  + [Linking html files](#linking-html-files)
  + [CSS preprocessor](#css-preprocessor)
  + [JS minify/transpile](#js-minify-transpile)
  + [Build the website](#build-the-website)

## Installation
Install using the following commands
```sh
npm install modularize-html
```

## Usage
Add the following lines in your `package.json` under `scripts`:  
```json
"create-config": "modularize-html create-config",
"dev": "modularize-html serve",
"new-page": "modularize-html new-page",
"build": "modularize-html build"
```

Next, run `npm run create-config`. This creates the necessary config file. Ater that you can run `npm run dev`, and start developing.

Build your website in a folder called `src` in the root directory of your project. The page templates should go in `src/pages`. Partials/components can go into any directory. Just link them in your page to use them.

## Config
There are a few configurable options for modularize-html in `modularize-html-config.json`.
### build.minify.js
*Boolean*  
Minify the JavaScript files on build.

### build.minify.css
*Boolean*  
Minify the CSS files on build.

### build.encodeImagesWebp
*Boolean*  
Encode `.jpg` and `.png` images to `.webp` on build. More info [here](#webp-images).

### build.pageTitle.home
*String*  
`<title>` for the `index.html` file.

### build.pageTitle.suffix
*String*  
Suffix for the page `<title>`. Can be empty.

### development.removeWebpSources
*Boolean*  
Remove `.webp` `<source>` tags from a `<picture>` element while running the dev server. More info [here](#webp-images).

### development.staticSite
*Boolean*  
Send message to the browser if the link navigate to doesn't contain `.html`. That means it's not linked in the html with `.html` and won't work as a static site.  
If you are planning on hosting the pages on a web server, you won't need to do so, because the server should resolve the url.

### development.customTemplateVariables
*Object*  
Keys in this object will be made available in your ejs template pages. This way you can pass in your own arrays and objects to the template in order to build the site from the provided data.

## Development
To develop the website, this app uses a simple [express](https://www.npmjs.com/package/express) server. To run the dev server enter `npm run dev` in the terminal.

### New page
To create a new page use `npm run new-page pagename`. Where `pagename` would be the name of your page. This creates a new template with the head and tail already linked.

### Page titles
The page titles are based on the filenames. The only exception being index(.html), which can be set in the [config](#build.pageTitle.home). You can put a suffix behind the title, also found in the [config](#build.pageTitle.suffix). If you want to use a custom page title, you must add your own `<head>` and __not__ use the default `head.ejs`.

### webp images
While developing you can enable the options under the `webp` key in the config to develop your website without having to worry about compiling images to `.webp` format. This is done in the build step if `encodeImages` is set to `true`.  
If you'd like to use `.webp` images in the final build, it's recommended to use the provided `image-jpg.ejs` or `image-png.ejs` templates. Alternatively you can link your `.webp` sources manually.

### Linking html files
Linking to another file is the same as you would in a static html file, so link to `/index.html`.  
Also see the [development.staticSite](#development.staticSite) config option.

### CSS preprocessor
You can use your own css preprocessor if you so desire. Just make sure changes in your source file are being watched and compiled a css file and make sure it's linked in [head.ejs](src/partials/head.ejs), or your custom `<head>`. Otherwise changes won't show up or be included in the compiled website.

### JS minify/transpile
You can use your own js transpiler if you so desire. Just make sure it's compiled and linked in [tail.ejs](src/partials/tail.ejs), or anywhere else, before compiling the website.

### Build the website
If you are done you can build the website using `npm run build`. This will copy the assets folder to a newly created `dist` folder. It also compiles the ejs templates and creates an html file in the `dist` folder.
