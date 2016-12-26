module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            main: ['resources/scripts/*.js']
        },
        concat: {
            dist: {
                src: ['resources/scripts/*.js'],
                dest: 'resources/static/js/app.js'
            }
        },
        uglify: {
            dist: {
                src: 'resources/static/js/app.js',
                dest: 'resources/static/js/app.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'resources/graphics/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'resources/static/img/'
                }]
            }
        },
        sass: {
            options: {
                sourcemap: 'none',
                style: 'expanded',
                compass: true
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'resources/static/css/styles.css': 'resources/scss/styles.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['resources/scripts/**/*.js'],
                tasks: ['concat']
                // tasks: ['concat', 'uglify']
            },
            css: {
                files: ['resources/scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            graphics: {
                files: ['resources/graphics/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass']);
};