module.exports = {
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: "babel?presets[]=es2015" }
        ]
    }
}