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
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.(woff2?|ttf|html|png)$/, loader : "file-loader?name=[name].[ext]" }
        ]
    },
    devServer: {
        contentBase: "./www"
    }
};