module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
            build: 'static/build',
            tmp: 'static/tmp',
            libs: 'static/libs',
            bower: 'static/bower_components',
            css: 'static/css',
            scss: 'static/scss'
        },
        clean: {
            before_build: {
                src: ['<%= path.build %>']
            },
            after_build: {
                src: ['<%= path.tmp %>']
            }
        },
        jshint: {
            main: ['static/scripts/*.js']
        },
        sass: {
            options: {
                sourcemap: 'none',
                style: 'compressed',
                compass: true
            },
            dist: {
                files: {
                    '<%= path.css %>/styles.min.css': '<%= path.scss %>/styles.scss'
                }
            }
        },
        bower_concat: {
            all: {
                dest: '<%= path.tmp %>/_bower.js'
            }
        },
        concat: {
            scripts: {
                src: [
                    '<%= path.tmp %>/js/_bower.js',
                    '<%= path.libs %>/**/*.js',
                    'static/scripts/*.js'
                ],
                dest: '<%= path.tmp %>/app.js'
            },
            styles: {
                src: [
                    '<%= path.bower %>/bootstrap/dist/css/bootstrap.min.css',
                    '<%= path.bower %>/bootstrap/dist/css/bootstrap-theme.min.css',
                    '<%= path.libs %>/font-awesome/css/font-awesome.min.css',
                    '<%= path.css %>/styles.min.css'
                ],
                dest: '<%= path.build %>/styles.min.css'
            }
        },
        uglify: {
            dist: {
                src: '<%= path.tmp %>/app.js',
                dest: '<%= path.build %>/app.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'static/graphics/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= path.build %>/img/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['<%= path.scss %>/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            graphics: {
                files: ['static/graphics/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [
        'clean:before_build',
        'jshint',
        'sass',
        'bower_concat',
        'concat',
        'uglify',
        'imagemin',
        'clean:after_build'
    ]);
};