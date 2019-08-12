var postcss = require('postcss')

var plugin = require('./')

var sampleOpts = {
  map: {
    files: {
      '../images/bg-students.jpg': 834055,
      '../images/bg-people.png': 834064,
      '../images/bg-triangle-dots.svg': 834068,
      '../images/bg-triangle-dots-l.svg': 834069,
      '../images/arrow-left.svg': 834044,
      '../images/arrow-right.svg': 834070,
      '../images/uncommon-good.svg': 834073,
      '../images/bg-splash.jpg': 834074,
      '../images/check.svg': 834078,
      '../font/fontA.woff': 123456,
      '../font/fontA.woff2': 123457
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

it('changes url if background-image prop found', function () {
  return run(
    'a{ background-image: url(../images/bg-students.jpg) }',
    'a{ background-image: url(<t4 id="834055" />) }',
    sampleOpts
  )
})

it('changes url if src prop found', function () {
  return run(
    '@font-face{font-family:Zilla Slab;font-style:normal;font-weight:400;src:local("Zilla Slab"),local("ZillaSlab-Regular"),url(../font/fontA.woff) format("woff2"),url(../font/fontA.woff2) format("woff")}', // eslint-disable-line max-len
    '@font-face{font-family:Zilla Slab;font-style:normal;font-weight:400;src:local("Zilla Slab"),local("ZillaSlab-Regular"),url(<t4 id="123456" />) format("woff2"),url(<t4 id="123457" />) format("woff")}', // eslint-disable-line max-len
    sampleOpts
  )
})

it('changes url if background prop found', function () {
  return run(
    'a{ background: url(../images/bg-triangle-dots.svg) }',
    'a{ background: url(<t4 id="834068" />) }',
    sampleOpts
  )
})

it('changes url if mult background-image props are found', function () {
  return run(
    'a{ background-image: url(../images/bg-triangle-dots.svg), url(../images/bg-triangle-dots-l.svg) }', // eslint-disable-line max-len
    'a{ background-image: url(<t4 id="834068" />), url(<t4 id="834069" />) }',
    sampleOpts
  )
})

it('hits an added selector if set in the options', function () {
  sampleOpts.selectors = ['href', 'src']

  var result = run(
    'a{href: url(../images/check.svg) }',
    'a{href: url(<t4 id="834078" />) }',
    sampleOpts
  )

  sampleOpts.selectors = null

  return result
})

it('does not change images if map is not found', function () {
  return run(
    'a{background_image: url(../images/dont-change.jpg) }',
    'a{background_image: url(../images/dont-change.jpg) }',
    sampleOpts
  )
})
