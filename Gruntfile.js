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
                src: 'dest/temp/app.js',
                dest: 'dest/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['scripts/src/*.js'],
                tasks: ['babel', 'uglify'],
            },
            css: {
                files: ['source/stylus/*.styl'],
                tasks: ['stylus']
            }
        },
        stylus: {
            'source/css/index.css': 'source/stylus/*.styl'
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'scripts/build/b.js': 'scripts/src/b.js'
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'scripts/build/module.js': ['scripts/src/b.js'],
                },
                options: {
                     "transform": [["babelify", { "presets": ["es2015"] }]]
                },
            },
        },
        clean: ["source/css/*", "scripts/build/*"],
    });

    // load plugs
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-browserify');

    // mession
    grunt.registerTask('default', ['babel', 'clean', 'uglify']);
    grunt.registerTask('develop', ['watch:dev']);
};




