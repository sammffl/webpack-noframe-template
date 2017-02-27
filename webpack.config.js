var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    ip = require('ip'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ROOT_PATH = path.resolve(__dirname);
APP_PATH = path.resolve(ROOT_PATH, 'static/js/main');

module.exports = {
    context: __dirname,
    entry: [
        // Add the client which connects to our middleware
        // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
        // useful if you run your app from another point like django
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        // And then the actual application
        './static/js/mian.js',
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss') //"style-loader!css-loader?sourceMap&-minimize"
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css?-minimize!autoprefixer-loader!sass') //"style-loader!css-loader!sass-loader?sourceMap"
        }, {
            test: /\.(png|jpg)$/,
            loader: "url-loader?limit=8192"
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
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
        new ExtractTextPlugin('[name].css'),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('mock')
        })
    ],
}