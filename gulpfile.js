'use strict';

// General Packages
var gulp       = require('gulp')
  , del        = require('del')
  , fs         = require('fs')
  , path       = require('path')
  , lazypipe   = require('lazypipe')
  , browserify = require('browserify')
  , watchify   = require('watchify')
  , _          = require('lodash')

// Vinyl Packages
var source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')

// Gulp Packages
var babel    = require('gulp-babel')
  , concat   = require('gulp-concat')
  , connect  = require('gulp-connect')
  , gulpif   = require('gulp-if')
  , ignore   = require('gulp-ignore')
  , srcmap   = require('gulp-sourcemaps')
  , uglify   = require('gulp-uglify')
  , gutil    = require('gulp-util')
  , mocha    = require('gulp-mocha-phantomjs')
  , rename   = require('gulp-rename')

// Configuration
var config = {}

config.tasks =
  { default: ['']
  }

config.paths =
  { base : './'
  , src   : 'src'
  , build : 'build'
  , test  : 'test'
  , bower : 'bower_components'
  }

config.files =
  { main : 'scenescroller'
  , test : 'test'
  }

config.envs =
  { dev  :
    { name : 'dev'
    , sourcemaps : true
    }
  , prod :
    { name : 'prod'
    , sourcemaps : false
    }
  }

// Browserify (+ Watchify)
config.browserify =
  { src:
    { debug   : true
    , entries : ['./' + path.join(config.paths.base, config.paths.src, config.files.main)]
    }
  , test:
    { debug   : true
    , entries : ['./' + path.join(config.paths.base, config.paths.test, config.files.test)]
    }
  }

// Runtime object
var g = {}

g.bundles = {}

// `dev` is default env
g.env = config.envs.dev

// Reusable Pipelines
var pipelines = {}

// Uglify
pipelines.uglify = lazypipe()
  .pipe(function() {
    return rename(function(path) {
      path.extname = '.min' + path.extname
    })
  })
  .pipe(function() {
    return gulpif(g.env.sourcemaps === true, srcmap.init({loadMaps: true}))
  })
  .pipe(uglify)
  .pipe(function() {
    return gulpif(g.env.sourcemaps === true, srcmap.write())
  })

// Bundle (Browserify + Watchify)
pipelines.bundle = lazypipe()
  .pipe(buffer)
  .pipe(function() {
    return gulpif(g.env.sourcemaps === true, srcmap.init({loadMaps: true}))
  })
  .pipe(babel)
  .pipe(function() {
    return gulpif(g.env.sourcemaps === true, srcmap.write())
  })
  .pipe(function() {
    return rename(function(path){
      path.dirname = ''
    })
  })

// Tasks

// Dev: Just build, test, and exit
gulp.task('dev', function() {
  g.env = config.envs.dev
  return gulp.start(['build-src', 'build-test'],  ['test'])
})

gulp.task('test-init', ['connect', 'build-src-watch', 'build-test-watch'], function() {
  gulp.start(['test'])
})

gulp.task('test-init', ['connect', 'build-src-watch', 'build-test-watch'], function() {
  gulp.start(['test'])
})

gulp.task('test-ci-init', ['connect', 'build-src', 'build-test'], function() {
  gulp.start(['test-ci'])
})

gulp.task('test', function() {
  if(!g.connect){
    return gulp.start(['test-init'])
  }
  var stream = mocha({ reporter: 'spec' })
  stream.write({ path: 'http://localhost:8080/build/test.html' })
  stream.end()
  return stream
})

gulp.task('test-ci', function() {
  if(!g.connect){
    return gulp.start(['test-ci-init'])
  }
  var stream = mocha({ reporter: 'tap' })
  stream.write({ path: 'http://localhost:8080/build/test.html' })
  stream.once('error', function(err) {
    process.exit(1)
  })
  stream.once('end', function() {
    process.exit(0)
  })
  stream.end()
  return stream
})

gulp.task('build-src', function(callback) {
  gulp.start(['html-src'])
  var opts      = _.assign({}, watchify.args, config.browserify.src)
    , srcBundle = watchify(browserify(opts))

  var srcPipe = lazypipe()
    .pipe(function() {
      return source(path.join(config.paths.base, config.paths.src, config.files.main))
    })
    .pipe(pipelines.bundle)
    .pipe(function() {
      return gulp.dest(config.paths.build)
    })
    .pipe(function() {
      return ignore.exclude('*.map')
    })
    .pipe(pipelines.uglify)
    .pipe(function() {
      return gulp.dest(config.paths.build)
    })

  g.bundles.src = { bundle: srcBundle, pipe: srcPipe }

  srcBundle.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error (build-src)'))
    .pipe(srcPipe())
    .on('end', function(){
      callback()
    })
})

gulp.task('build-src-watch', ['build-src'], function() {

  var b = g.bundles.src

  b.bundle.on('log', gutil.log)

  return b.bundle.on('update', function(e) {

    var filenames = _.map(e, function(filepath) {
      return path.basename(filepath)
    })

    gutil.log('Browserify:'
             , '\'' + gutil.colors.cyan('build-src') + '\':'
             , gutil.colors.blue('File(s) updated:')
             , filenames)

    b.bundle.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error (build-src)'))
      .pipe(b.pipe())
  })

})


gulp.task('build-test', function(callback) {
  gulp.start(['html-test'])

  var opts       = _.assign({}, watchify.args, config.browserify.test)
    , testBundle = watchify(browserify(opts))

  var testPipe =lazypipe()
    .pipe(function() {
      return source(path.join(config.paths.base, config.paths.test, config.files.test))
    })
    .pipe(pipelines.bundle)
    .pipe(function() {
      return gulp.dest(config.paths.build)
    })
    .pipe(connect.reload)

  g.bundles.test = { bundle: testBundle, pipe: testPipe }


  testBundle.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error (build-test)'))
    .pipe(testPipe())
    .on('end', function(){
      callback()
    })
})

gulp.task('build-test-watch', ['build-test'], function() {
  var b = g.bundles.test
  b.bundle.on('update', function(e) {
    var filenames = _.map(e, function(filepath) {
      return path.basename(filepath)
    })
    gutil.log('Browserify:'
             , '\'' + gutil.colors.cyan('build-test') + '\':'
             , gutil.colors.blue('File(s) updated') + ':'
             , filenames)
    b.bundle.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error (build-test)'))
      .pipe(b.pipe())
  })
  b.bundle.on('log', gutil.log)
})

gulp.task('connect', function() {
  if(!g.connect) {
    g.connect = true
    connect.server({ livereload: true })
  }
})

gulp.task('reload', function() {
  return gulp.src(path.join(config.paths.base, config.paths.src, config.files.main))
    .pipe(connect.reload())
})

gulp.task('watch', ['test'], function(callback) {

  var watchers =
    [ gulp.watch( path.join( config.paths.base
                           , config.paths.src
                           , '**/*.html'
                           )
                , ['html-src']
                )
    , gulp.watch( path.join( config.paths.base
                           , config.paths.test
                           , '**/*.html'
                           )
                , ['html-test']
                )
    , gulp.watch( path.join( config.paths.base
                           , config.paths.build
                           , '**/*'
                           )
                , ['test', 'reload']
                )
    ]

  _.each(watchers, function(watcher){
    watcher.on('change', function(e) {
      gutil.log('File ' + e.type + ': ' + e.path)
    })
  })

  callback()
})


gulp.task('prod', function() {
  g.env = config.envs.prod
  gulp.start(['html', 'uglify'])
})

gulp.task('serve', function() {

})

gulp.task('clean', function() {
  var paths = del.sync([config.paths.build])
  gutil.log('Deleted ', paths)
})


gulp.task('html-src', function() {
  return gulp.src(path.join(config.paths.base, config.paths.src, '*.html'))
             .pipe(gulp.dest(config.paths.build))
             .pipe(connect.reload())
})

gulp.task('html-test', function() {
  return gulp.src(path.join(config.paths.base, config.paths.test, '*.html'))
             .pipe(gulp.dest(config.paths.build))
             .pipe(connect.reload())
})

gulp.task('uglify', function() {
  return gulp.src(path.join(config.paths.base.src, '*.js'))
             .pipe(pipelines.uglify())
             .pipe(concat('scenescroller.min.js'))
             .pipe(gulp.dest(config.paths.base.build))
             .pipe(connect.reload())
})

