var postcss = require('postcss')

module.exports = postcss.plugin('postcss-terminal4-media', function (opts) {
  opts = opts || {
    map: {
      images: {}
    }
  }

  if (!opts.media_string) {
    opts.media_string = '<t4 type="media" formatter="path/*" id="{d}" />'
  }

  // Work with options here

  return function (root) {
    Object.keys(opts.map.images).forEach(function (imageUrl) {
      root.replaceValues(
        imageUrl, {
          props: ['background_image', 'background']
        }, function () {
          return opts.media_string.replace('{d}', opts.map.images[imageUrl])
        })
    })
  }
})
