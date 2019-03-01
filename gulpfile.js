
"use strict"


var gulp = require("gulp");
var sass = require("gulp-sass");
var minify = require("gulp-csso");
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var spritesmith = require("gulp.spritesmith")
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var pug = require('gulp-pug');
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var htmlmin = require("gulp-htmlmin");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/serviceWorker-registration.js",
    "source/serviceWorker.js"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function(){
  return del("build");
})

gulp.task("style",function(){
  var processors = [
      autoprefixer({browsers:[" last 2 version "] }),
  ];
	gulp.src("source/sass/style.scss")
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss(processors))
	.pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
	.pipe(server.stream());
});

gulp.task("image",function(){
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel:3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("spritepng",function(){
  var spriteData = gulp.src('build/img/**/*advantage-*.png')
  .pipe(spritesmith({
    retinaSrcFilter: 'build/img/**/*advantage-*@2x.png',
    retinaImgName: 'advantage-sprite-retina.png',
    imgName: 'advantage-sprite.png',
    padding: 10,
    cssName: 'sprite.css',
    cssFormat: 'css',
    algorithm: 'binary-tree',
    cssVarMap: function (sprite) {
        sprite.name = sprite.name
    }
  }));
  spriteData.img.pipe(gulp.dest('build/img'));
});

gulp.task("webp",function(){
  return gulp.src("build/img/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

gulp.task("sprite",function(){
  return gulp.src("build/img/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("pug",function(){
  return gulp.src('source/pug/*.pug')
  .pipe(pug({
    pretty:true
  }))
  .pipe(posthtml([
    include()
    ]))
  .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
  .pipe(htmlmin({collapseWhitespace:true}))
  .pipe(gulp.dest("build"))
  .pipe(server.stream());
});

gulp.task("compress",function(){
  return gulp.src("source/js/*.js")
  .pipe(concat("script.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(uglify())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(server.stream());
});

gulp.task("server",function(){
	server.init({
		server: "build/",
		notify: false,
		open:true,
		cors:true,
		ui:false
	});

	gulp.watch("source/sass/**/*.{scss,sass}",["style"]);
  gulp.watch("source/pug/**/*.pug",["pug"]);
  gulp.watch("source/js/**/*.js",["compress"]);
});

gulp.task("build",function(done){
  run(
    "clean",
    "copy",
    "style",
    "image",
    "spritepng",
    "webp",
    "sprite",
    "pug",
    "compress",
    "server",
    done
  );
});
