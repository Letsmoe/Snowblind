const path = require('path');
module.exports = [{
        mode: "development",
        entry: "./lib/index.js",
        experiments: {
            outputModule: true
        },
        output: {
            filename: "snowblind.dev.js",
            path: path.resolve(__dirname, 'dist'),
            library: {
                type: "module"
            }
        }
    }, {
        mode: "production",
        entry: "./lib/index.js",
        experiments: {
            outputModule: true
        },
        output: {
            filename: "snowblind.min.js",
            path: path.resolve(__dirname, 'dist'),
            library: {
                type: "module"
            }
        }
    }];
