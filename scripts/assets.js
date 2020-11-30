const gulp = require('gulp');
const sprite = require('gulp-svg-sprite');
const assetsPath = "./src/components/EditorCommandMenu/assets"

const svgSprite = sprite({ 
  shape: { dimension: { maxWidth: 20, maxHeight: 20 }, },
  mode: { defs: { dest: '.', prefix: '%s', sprite: 'sprite.svg', bust: false } }
})

gulp.src(`${assetsPath}/*.svg`)
  .pipe(svgSprite)           
  .pipe(gulp.dest(`${assetsPath}`)) 