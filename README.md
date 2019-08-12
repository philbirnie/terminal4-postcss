# PostCSS Terminal4 Media [![Build Status][ci-img]][ci]

[PostCSS] plugin Uses a map to replace all CSS strings with media references in terminal 4.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/philbirnie/postcss-terminal4-media.svg
[ci]:      https://travis-ci.org/philbirnie/postcss-terminal4-media

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-terminal4-media') ])
```

See [PostCSS] docs for examples for your environment.
