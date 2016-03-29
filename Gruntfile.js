module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Configuración de deploy por FTP
        'ftp-deploy': {
            build: {
                auth: {
                    host: '[HOST]',
                    port: 21,
                    authKey: 'mainkey'
                },
                src: '[RUTA_ABSOLUTA]',
                dest: '/public_html',
                exclusions: [
                    '/Users/nicoavila/Sites/nicoBlueprint/**/.DS_Store', 
                    '/Users/nicoavila/Sites/nicoBlueprint/**/.test' 
                ]
            }
        },

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
                    'resources/sass/*'

                ],
                tasks: ['sass']
            }
        }
    });

    // Carga las tareas
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Establece el nombre de las tareas
    grunt.registerTask('build', ['sass', 'copy']);
    grunt.registerTask('deploy', ['ftp-deploy'])
    grunt.registerTask('default', ['build', 'watch']);
}