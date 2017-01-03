var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var projectPath = path.resolve(__dirname, "static");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var lib = path.resolve(__dirname, "lib");
var ip = require('ip');
var outputPath = './'
var src = {
	test: 'https://i0stg.yztcdn.com/app_js/h5/life/cjzx/',
	production: 'https://i0.yztcdn.com/app_js/h5/life/cjzx/',
}
var entryObj = {
    app: "./static/js/mian.js"
};
if(process.env.NODE_ENV === 'mock'){
    entryObj = {
        mock: "./mock/product.js",
        app: "./static/js/mian.js",
    };
}else{
    outputPath: process.env.NODE_ENV == 'test'? src.test: src.production
}

module.exports = {
    entry: entryObj,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: outputPath +"[name].bundle.js?v=[hash]",
		publicPath: '',
        // libraryTarget: "var",
        // library: "lib"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader?sourceMap"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
               test: /\.js$/,
               exclude: /(node_modules|bower_components)/,
               loader: 'babel-loader',
               query: {
                   presets: ['es2015']
               }
           }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "no frame project",
            filename: "index.html",
            inject: "true",
            minify: {
                collapseWhitespace: true
            },
            template: "./index.html",
        }),
        new ExtractTextPlugin("./css/[name].css?v=[hash]"),
        new webpack.ProvidePlugin({
            $: "jquery",
        }),
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", ".es6", "css", "scss", "png", "jpg", "jpeg"],
        alias: {
            "jquery": path.join(nodeModulesPath, "/jquery/dist/jquery.min"),
            // "zepto": path.join(lib, "/zepto.min")
        },
    },
    // externals: {
    //     // require("jquery") 是引用自外部模块的
    //     // 对应全局变量 jQuery
    //     "jquery": "jQuery"
    // }
};
