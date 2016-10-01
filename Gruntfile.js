module.exports = function (grunt) {

    var buildDir = 'build';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            buildDir
        ],

        symlink: {
            options: {
                // Enable overwrite to delete symlinks before recreating them
                overwrite: false,
                // Enable force to overwrite symlinks outside the current working directory
                force: false
            },
            // The "build/target.txt" symlink will be created and linked to
            // "source/target.txt". It should appear like this in a file listing:
            // build/target.txt -> ../source/target.txt
            node_modules: {
                src: 'node_modules',
                dest: buildDir + '/node_modules'
            }
        },

        copy: {
            // fonts: {
            //     files: [
            //         {
            //             expand: true,
            //             filter: 'isFile',
            //             flatten: true,
            //             src: 'node_modules/bootstrap/dist/fonts/*',
            //             dest: publicFonts + '/'
            //         },
            //         {
            //             expand: true,
            //             filter: 'isFile',
            //             flatten: true,
            //             src: 'node_modules/react-widgets/dist/fonts/*',
            //             dest: publicFonts + '/'
            //         }
            //     ]
            // },
            // images: {
            //     files: [{
            //         expand: true,
            //         filter: 'isFile',
            //         flatten: true,
            //         src: 'node_modules/react-widgets/dist/img/*',
            //         dest: publicImg + '/'
            //     }]
            // },
            src2build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**', '!**/*.less', '!**/*.jsx'],
                        dest: buildDir + '/'
                    }
                ]
            },
            package2Build: {
                files: [{
                    expand: false,
                    filter: 'isFile',
                    flatten: true,
                    src: 'package.json',
                    dest: buildDir + '/'
                }]
            }
        },

        babel: {
            'transform-jsx': {
                options: {
                    sourceMap: true,
                    plugins: ['transform-react-jsx'],
                    // auxiliaryCommentBefore: 'Babel jsx transform:',
                    // auxiliaryCommentAfter: 'end of jsx transform',
                    ast: false
                },
                files: [
                    {
                        expand: true,
                        filter: 'isFile',

                        cwd: 'src/',
                        src: ['**/*.jsx'],
                        dest: buildDir + '/'
                    }
                ]
            }
        },

        electron: {
            win: {
                options: {
                    arch: 'x64',
                    dir: './build',
                    platform: 'win32',
                    asar: true,
                    ignore: [
                        'packager.js',
                        '.idea',
                        '.git',
                        'Gruntfile.js'
                    ],
                    out: 'release',
                    overwrite: true,
                    prune: true,
                    // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md
                    // says that deferSymlink default is true
                    // but it is not true ))
                    derefSymlinks: true
                }
            }
        },

        less: {
            build: {
                files: [{
                    src: 'src/**/*.less',
                    dest: buildDir + '/app.css'
                }],
                options: {
                    plugins: [
                        new (require('less-plugin-npm-import'))
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'symlink:node_modules', 'copy:src2build', 'copy:package2Build', 'babel:transform-jsx', 'less:build']);
    grunt.registerTask('package', ['clean', 'symlink:node_modules', 'copy:src2build', 'copy:package2Build', 'babel:transform-jsx', 'less:build', 'electron:win']);
};