/* global module:false */
const util = require('util');
const glob = require("glob");
const path = require("path");

const basepath = 'python';

module.exports = function(grunt) {
	const port = grunt.option('port') || 8000;
	const root = [grunt.option('root')] || ['.'];

	// Project configuration
	grunt.initConfig({
		pug: {
			compile: {
				files: glob.sync(`views/*.main.pug`).map(filename => {
					const basename = path.basename(filename, ".main.pug");
					return {
						src: filename,
						dest: `${basepath}/${basename}.html`,
					}
				}),
			}
		},

		uglify: {
			build: {
				src: 'js/reveal.js',
				dest: `${basepath}/js/reveal.min.js`,
			}
		},

		sass: {
			core: {
				files: [
					{
						dest: `${basepath}/css/reveal.css`,
						src: 'css/reveal.scss',
					}
				]
			},
			themes: {
				files: [
					{
						expand: true,
						cwd: 'css/theme/source',
						src: ['*.scss'],
						dest: `${basepath}/css/theme`,
						ext: '.css'
					}
				]
			}
		},

		autoprefixer: {
			dist: {
				src: `${basepath}/css/reveal.css`,
			}
		},

		cssmin: {
			compress: {
				files: [
					{
						dest: `${basepath}/css/reveal.min.css`,
						src: `${basepath}/css/reveal.css`,
					}
				]
			}
		},

		connect: {
			server: {
				options: {
					port: port,
					base: ['.'],
					livereload: true,
					open: `http://localhost:${port}/${basepath}/index.html`,
				}
			},

		},

		watch: {
			pug: {
				files: [ 'views/*.pug' ],
				tasks: 'pug'
			},
			options: {
				livereload: true
			}
		},

		copy: {
			lib: {
				files: [
					{expand: true, src: ['lib/**', 'plugin/**'], dest: `${basepath}/`}
				]
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
	grunt.registerTask('js', ['uglify']);
	grunt.registerTask('lib', ['copy']);
	grunt.registerTask('html', ['pug']);

	grunt.registerTask('all', ['css', 'js', 'lib', 'html']);
	grunt.registerTask('serve', ['all', 'connect', 'watch']);
};
