var path = require("path");
module.exports = {
    context: path.resolve("./src"),
    entry: "./main",
    output: {
        path: path.resolve("./www"),
        filename: "app.js"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
    },
    devtool: "inline-source-map",
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.less$/, loader: "style!css!less?noIeCompat&strictMath" },
            { test: /\.woff2?$/, loader : "file-loader?name=[name].[ext]" }
        ]
    },
    devServer: {
        contentBase: "./www"
    }
};