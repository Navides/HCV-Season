var path = require("path");

module.exports = function (config) {
    config.set({
        browsers: [ "Chrome" ],
        coverageReporter: {
            reporters: [
                { type: "html", subdir: "html" },
                { type: "lcovonly", subdir: "." },
            ],
        },
        files: [
            "tests.webpack.js",
        ],
        frameworks: [
            "jasmine",
        ],
        preprocessors: {
            "tests.webpack.js" : [ "webpack", "sourcemap" ],
        },
        reporters: [ "progress", "coverage" ],
        webpack: {
            cache: true,
            devtool: "inline-source-map",
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        include: /test/,
                        exclude: /(bower_components|node_modules)/,
                        loader: "babel",
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.js?$/,
                        include: /src/,
                        exclude: /(node_modules|bower_components)/,
                        loader: "babel-istanbul",
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve(__dirname, "../src" ),
                        exclude: /(bower_components|node_modules)/,
                        loader: "babel",
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        },
        captureTimeout: 210000,
        browserDisconnectTolerance: 3, 
        browserDisconnectTimeout : 210000,
        browserNoActivityTimeout : 210000
    });
};
