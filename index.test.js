var postcss = require('postcss')

var plugin = require('./')

var sampleOpts = {
  map: {
    images: {
      '../images/bg-students.jpg': 834055,
      '../images/bg-people.png': 834064,
      '../images/bg-triangle-dots.svg': 834068,
      '../images/bg-triangle-dots-l.svg': 834069,
      '../images/arrow-left.svg': 834044,
      '../images/arrow-right.svg': 834070,
      '../images/uncommon-good.svg': 834073,
      '../images/bg-splash.jpg': 834074,
      '../images/check.svg': 834078
    }
  },
  media_string: '<t4 id="{d}" />'
}

function run (input, output, opts) {
  return postcss([plugin(opts)]).process(input).then(function (result) {
    expect(result.css).toEqual(output)
    expect(result.warnings()).toHaveLength(0)
  })
}

it('changes an image to its appropriate map if found', function () {
  return run(
    'a{ background_image: url(../images/bg-students.jpg) }',
    'a{ background_image: url(<t4 id="834055" />) }',
    sampleOpts
  )
})

it('does not change images if map is not found', function () {
  return run(
    'a{background_image: url(../images/dont-change.jpg) }',
    'a{background_image: url(../images/dont-change.jpg) }',
    sampleOpts
  )
})
