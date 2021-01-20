# ModularHTML
This project uses ejs to allow building a static website from modular ejs (HTML) files.  
It's using ejs because you won't need to learn a new language, only a few new tags.  
More info on ejs [here](https://ejs.co/)

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Config](#config)
  + [build.minify.js](#buildminifyjs)
  + [build.minify.css](#buildminifycss)
  + [build.encodeImagesWebp](#buildencodeimageswebp)
  + [development.removeWebpSources](#developmentremovewebpsources)
  + [development.staticSite](#developmentstaticsite)
* [Development](#development)
  + [New page](#new-page)
  + [webp images](#webp-images)
  + [Linking html files](#linking-html-files)
  + [CSS preprocessor](#css-preprocessor)
  + [JS minify/transpile](#js-minify-transpile)
  + [Build the website](#build-the-website)

## Installation
Install using the following commands
```
git clone https://github.com/jeroentvb/modularHTML.git
cd modularhtml
npm install
```

## Usage
Build your website in the [src](src/) folder. The page templates should go in [src/pages](src/pages). The partials, such as the head and tail, should go in [src/partials](src/partials).

## Config
There are a few configurable options for modular-html in `modular-html-config.json`.
### build.minify.js
*Boolean*  
Minify the JavaScript files on build.

### build.minify.css
*Boolean*  
Minify the CSS files on build.

### build.encodeImagesWebp
*Boolean*  
Encode `.jpg` and `.png` images to `.webp` on build. More info [here](#webp-images).

### development.removeWebpSources
*Boolean*  
Remove `.webp` `<source>` tags from a `<picture>` element while running the dev server. More info [here](#webp-images).

### development.staticSite
*Boolean*  
*Default:*  
Send message to the browser if the link navigate to doesn't contain `.html`. That means it's not linked in the html with `.html` and won't work as a static site.  
If you are planning on hosting the pages on a web server, you won't need to do so, because the server should resolve the url.

## Development
To develop the website, this app uses a simple [express](https://www.npmjs.com/package/express) server. You can run the server using `npm start`.  

### New page
To create a new page use `npm run new-page pagename`. Where `pagename` would be the name of your page. This creates a new template with the head and tail already linked.

### webp images
While developing you can enable the options under the `webp` key in the config to develop your website without having to worry about compiling images to `.webp` format. This is done in the build step if `encodeImages` is set to `true`.  
If you'd like to use `.webp` images in the final build, it's recommended to use the provided `image-jpg.ejs` or `image-png.ejs` templates. Alternatively you can link your `.webp` sources manually.

### Linking html files
Linking to another file is the same as you would in a static html file, so link to `/index.html` and **not** to `/index`, because that won't work after compiling.

### CSS preprocessor
You can use your own css preprocessor if you so desire. Just make sure changes in your source file are being watched and compiled a css file and make sure it's linked in [head.ejs](src/partials/head.ejs). Otherwise changes won't show up or be included in the compiled website.

### JS minify/transpile
You can use your own js transpiler if you so desire. Just make sure it's compiled and linked in [tail.ejs](src/partials/tail.ejs) before compiling the website.

### Build the website
If you are done you can build the website using `npm run build`. This will copy the assets folder to a newly created `public` folder. It also compiles the ejs templates and creates an html file in the `public folder`.
