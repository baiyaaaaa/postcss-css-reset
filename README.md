# PostCSS css-reset [![Build Status][travis-img]][travis]

[PostCSS] plugin to help you to reset your css via at-rules.

## Syntax

##reset-global
`@reset-global: [pc|mobile]`;

```css
/* before */
@reset-global pc;

/* after */
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td { margin: 0; padding: 0 }
table { border-collapse: collapse; border-spacing: 0 }
fieldset, img { border: 0 }
address, caption, cite, code, dfn, em, strong, th, var { font-style: normal; font-weight: normal }
ol, ul { list-style: none }
caption, th { text-align: left }
h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal }
q: before, q: after { content: '' }
abbr, acronym { border: 0; font-variant: normal }
sup { vertical-align: text-top }
sub { vertical-align: text-bottom }
input, textarea, select { font-family: inherit; font-size: inherit; font-weight: inherit }
input, textarea, select { *font-size: 100% }
```

/* before */
@reset-global mobile;

/* after */
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { margin: 0; padding: 0 }
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section  { display: block; }
table { border-collapse: collapse; border-spacing: 0 }
audio, canvas, video  { display:  inline-block; *display: inline; *zoom: 1; }
fieldset, img { border: 0 }
address, caption, cite, code, dfn, em, strong, th, var { font-style: normal; font-weight: normal }
ol, ul { list-style: none }
caption, th { text-align: left }
h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal }
q: before, q: after { content: '' }
abbr, acronym { border: 0; font-variant: normal }
sup { vertical-align: text-top }
sub { vertical-align: text-bottom }
input, textarea, select { font-family: inherit; font-size: inherit; font-weight: inherit }
```

##reset-nested
`@reset-nested: [tabel|tabel-cell|list|font|boxModel]`;

```css
/* before */
.table {
  @reset-nested tabel;
}
.table th,
.table td {
  @reset-nested tabel-cell;
}
ul, ol {
  @reset-nested list;
}
.regular-font {
  @reset-nested font;
}
.box {
  @reset-nested boxModel;
}

/* after */
.table {
  border-collapse: collapse;
  border-spacing: 0;
  vertical-align: middle;
}
.table th,
.table td {
  background-color: #fff;
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
  margin: 0;
  padding: 0;
}
ul, ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
.regular-font {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
}
.box {
  margin: 0;
  padding: 0;
  width: auto;
  height: auto;
}
```

## Usage

Add [Postcss CSS Reset] to your build tool:

```bash
npm install postcss-css-reset --save-dev
```

#### Node

```js
require('postcss-css-reset').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Postcss CSS Reset] as a PostCSS plugin:

```js
postcss([
  require('postcss-css-reset')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Postcss CSS Reset] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-css-reset')({ /* options */ })
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Postcss CSS Reset] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-css-reset')({ /* options */ })
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[PostCSS]: https://github.com/postcss/postcss
[Postcss CSS Reset]: https://github.com/baiyaaaaa/postcss-css-reset
[travis-img]: https://travis-ci.org/baiyaaaaa/postcss-css-reset.svg
[travis]: https://travis-ci.org/baiyaaaaa/postcss-css-reset
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
