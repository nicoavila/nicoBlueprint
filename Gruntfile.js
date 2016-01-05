module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Copia los archivos
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
                        src: ['**/bootstrap.min.js'],
                        dest: 'assets/js/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/jquery.min.js', '**/jquery.min.map'],
                        dest: 'assets/js/'
                    },
                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap-sass/assets/fonts/**', 'font-awesome/fonts/**'],
                        dest: 'assets/fonts/'
                    }
                ]
            },
        },


        // Compila SASS a CSS minificado
        sass: {
            options: {
                includePaths: [
                    'bower_components/bootstrap-sass/assets/stylesheets',
                    'bower_components/font-awesome/scss/'
                ]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'assets/css/style.css' : 'resources/sass/style.scss'
                }
            }
        },

        // Observa los cambios en archivos
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            sass: {
                options: { livereload: true },
                files: [
                    'resources/sass/style.scss'
                ],
                tasks: ['sass']
            }
        }
    });

    // Carga las tareas
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Establece el nombre de las tareas
    grunt.registerTask('build', ['sass', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);
}