# PostCSS Terminal4 Media [![Build Status](https://travis-ci.org/philbirnie/terminal4-postcss.svg?branch=master)](https://travis-ci.org/philbirnie/terminal4-postcss)

Terminal4 Media plugin Uses a map to replace all CSS strings with media references in terminal 4.

[ci-img]:  https://travis-ci.org/philbirnie/postcss-terminal4-media.svg
[ci]:      https://travis-ci.org/philbirnie/postcss-terminal4-media

```css
.foo {
    background_image: url(../whatever-image.jpg)
}
```

```css
.foo {
    background_image: url(<t4 type="media" formatter="path/*" id=16 />)
}
```

## Usage

```js
postcss([ require('postcss-terminal4-media') ])
```

## Options:

Put all images into a map; the `media_string` value is optional; the default is shown below. `{d}` will be replaced with the resulting ID.

```$json
{
    "map": {
        "images": {
            "source": new_id
            "../images/example.jpg": 24
        }
    }
    "media_string": '<t4 type="media" formatter="path/*" id="{d}" />'
}
```
