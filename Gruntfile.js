module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // 项目配置
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
        concat: {
            options: {
                separator: ';',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dev: {
                src: ['src/*.js'],
                dest: 'dest/temp/bundle.js',
            },
            dist: {
                src: ['src/core.js'],
                dest: 'dest/temp/bundle.js',
            },
            dep: {
                src: ['src/core.js'],
                dest: 'dest/temp/xian.js',
            },
        },
        watch: {
            scripts: {
                files: ['scripts/src/*.js'],
                tasks: ['concat', 'babel', 'uglify'],
            },
            css: {
                files: ['source/style/*'],
                tasks: []
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'dest/temp/app.js': 'dest/temp/bundle.js'
                }
            }
        },
        clean: ["dest/temp"],
        express: {
            options: {
                port: 8080,
            },
            dev: {
                options: {
                    script: 'path/server.js'
                }
            }
        }
    });
    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express-server');
    // 默认任务
    grunt.registerTask('default', ['concat:dist', 'babel', 'clean', 'uglify']);
    grunt.registerTask('develop', ['concat:dev', 'watch:dev']);
    grunt.registerTask('dev', ['express', 'watch']);
    grunt.registerTask('server', [ 'express:dev', 'watch' ]);
    grunt.registerTask('dep', ['concat:dep']);
};




