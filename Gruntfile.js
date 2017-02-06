module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>  created by alex  at <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'scripts/build/md.js',
        dest: 'scripts/dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['scripts/src/*.js'],
        tasks: ['browserify', 'uglify'],
      },
      css: {
        files: ['source/stylus/*.styl'],
        tasks: ['stylus']
      }
    },
    stylus: {
      'source/css/index.css': 'source/stylus/index.styl'
    },
    browserify: {
      dist: {
        files: {
          'scripts/build/index.js': ['scripts/src/index.js'],
        },
        options: {
          "transform": [["babelify", { "presets": ["es2015"] }]]
        },
      },
    },
    clean: {
      all: ["source/css/*", "scripts/build/*"],
      dev: 'scripts/build/*'
    }

  })

  // load plugs
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');

  // mission
  grunt.registerTask('default', ['browserify', 'uglify', 'stylus']);
  grunt.registerTask('dev', ['watch']);
};




