module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['public/assets/css/sass/*.scss'],
                tasks: 'sass'
            },
            concat: {
                files: ['<%= concat.dist.src %>', '<%= concat.dist.dest %>'],
                tasks: 'concat'
            },
            uglify: {
                files: ['<%= uglify.build.src %>', '<%= uglify.build.dest %>'],
                tasks: 'uglify'
            },
            js: {
                files: ['public/assets/js/**', 'src/assets/js/*.js'],
                tasks: ['jshint']
            }
        },
        sass: {
            dist: {
                // options: {
                //     style: 'compressed'
                // },
                files: {
                    'public/assets/css/styles.css': 'public/assets/css/sass/styles.scss'
                }
            }
        },
        imagemin: {                          // Task
            dynamic: {
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                },                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'public/assets/img/',     // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'public/assets/img/'     // Destination path prefix
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/assets/js/master.js',
                dest: 'public/assets/js/master.min.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/assets/js/jquery-1.10.2.js', 'public/assets/js/plugins/*.js', 'public/assets/js/main.js'],
                dest: 'public/assets/js/master.js'
            }
        },
        jshint: {
            all: ['gruntfile.js', 'src/js/main.js']
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

            processors: [
                require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
            ]
            },
            dist: {
                src: 'public/assets/css/*.css'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Optimize images.
    grunt.registerTask('img', ['newer:imagemin']);

    // Default task(s).
    grunt.registerTask('default', ['sass', 'postcss', 'concat', 'uglify', 'jshint', 'watch']);

};