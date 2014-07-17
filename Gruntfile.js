module.exports = function(grunt) {
  grunt.initConfig({
    clean: ['dist/'],
    browserify: {
      'dist/index.js': ['src/**/*.js']
    },
    rework: {
      'dist/css/style.css': ['css//**/*.js'],
      options: {
        vendors: ['-moz-', '-webkit-']
      }
    },
    copy: {
      images: {
        src: 'img/**',
        dest: 'dist/',
        expand: true
      }
    },
    nodemon: {
      all: {
        script: 'server.js',
        options: {
          watchedExtensions: ['js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-rework');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['clean', 'browserify', 'rework', 'copy', 'nodemon']);
};