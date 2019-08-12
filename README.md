# PostCSS Terminal4 Media [![Build Status](https://travis-ci.org/philbirnie/terminal4-postcss.svg?branch=master)](https://travis-ci.org/philbirnie/terminal4-postcss)

The [Terminal 4 CMS](https://www.terminalfour.com/) utilizes tags similar to `<t4 type="media" formatter="path/*" id=16 />` in order to reference the URLs for media images, fonts, and so on.  This is problematic if you have crafted CSS locally and need to reference media files on Terminal 4.  It’s _especially_ a pain if you are working with a minified CSS file.  

This PostCSS plugin allows you to easily search for file strings and replace them with their requisite IDs.  You can then upload the resulting CSS file to Terminal Four and it will reference your media files appropriately.  

## From: 
```css
.foo {
    background_image: url(../whatever-vector.svg)
}
```

## To:
```css
.foo {
    background_image: url(<t4 type="media" formatter="path/*" id="16" />)
}
```

## Usage

```js
postcss([ require('postcss-terminal4-media')(opts) ])
```

## Options:

Put all files into a map; the `media_string` and `selectors` values are optional; the defaults are shown below. `{d}` will be replaced with the resulting ID.

```json
{
    "map": {
        "files": {
            "source": 25,
            "../images/example.jpg": 24
        }
    },
    "media_string": "<t4 type=\"media\" formatter=\"path/*\" id=\"{d}\" />",
    "selectors": ["background-image", "background", "src"]
}
```
