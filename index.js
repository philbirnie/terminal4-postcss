var postcss = require('postcss')

module.exports = postcss.plugin('postcss-terminal4-media', function (opts) {
  opts = opts || {
    map: {
      files: {}
    }
  }

  if (!opts.media_string) {
    opts.media_string = '<t4 type="media" formatter="path/*" id="{d}" />'
  }

  if (!opts.selectors) {
    opts.selectors = ['background-image', 'background', 'src']
  }

  // Work with options here

  return function (root) {
    Object.keys(opts.map.files).forEach(function (fileUrl) {
      root.replaceValues(
        fileUrl, {
          props: opts.selectors
        }, function () {
          return opts.media_string.replace('{d}', opts.map.files[fileUrl])
        })
    })
  }
})
