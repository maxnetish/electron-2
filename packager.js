'use strict';

const packager = require('electron-packager');

let packagerOptions = {
    arch: 'x64',
    dir: '.',
    platform: 'win32',
    asar: true,
    ignore: [
        'packager.js',
        '.idea'
    ],
    out: 'release',
    overwrite: true,
    prune: true
};

packager(packagerOptions, function done_callback(err, appPaths) {
    if (err) {
        console.log(err);
    } else {
        for (let ind = 0, len = appPaths.length; ind < len; ind++) {
            console.log(appPaths[ind], 'OK');
        }
    }
});
