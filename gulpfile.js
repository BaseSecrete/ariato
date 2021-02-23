const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function isJavaScript(file) {
  // Check if file extension is '.js'
  return file.extname === '.js';
}

function isCss(file) {
  // Check if file extension is '.css'
  return file.extname === '.css';
}

/* used to generate npm lib */
exports.default = function() {
  // Include JavaScript and CSS files in a single pipeline
  return src(['_site/assets/javascript/ariato.js', '_site/assets/css/ariato.css'])
  // Only apply gulp-uglify plugin to JavaScript files
  .pipe(gulpif(isJavaScript, uglify()))
  .pipe(gulpif(isJavaScript, rename({ extname: '.min.js' })))
  .pipe(gulpif(isCss, cleanCSS()))
  .pipe(gulpif(isCss, rename({ extname: '.min.css' })))
  .pipe(dest('dist/'));
}