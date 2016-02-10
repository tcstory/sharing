/**
 * Created by tcstory on 1/16/16.
 */


var distDir = 'dist';
var sourceDir = 'src';
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var debug = false;
process.argv.forEach(function (item) {
    if (item === '--debug') {
        debug = true
    }
});
module.exports = {
    entry:  './src/js/app.js',
    output: {
        path: distDir,
        filename: debug ? 'js/app.js':'js/'+"app.[chunkhash:8].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader',{publicPath: '../'})
                //loader:'style-loader!css-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(gif|jpg|png|svg)\??.*$/, //被font-awseome的版本号卡出翔了,原来这是导致错误的原因
                loader : 'url-loader?limit=8192&name=img/[name].[ext]'
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/i,
                loader: 'url?limit=10000&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app.html',
            filename: 'app.html',
            inject: 'body'
            //chunks: ['a','common']
        }),
        new ExtractTextPlugin(debug ? 'css/app.css' : "css/app.[chunkhash:8].css"),
        new webpack.ProvidePlugin({
            'Utils': path.resolve('./src/js/utils/utils.js'), //要用path.resolve,不然组件找不到模块
            'ConfigMap': path.resolve('./src/js/config.js')
        })
    ],
    devtool: debug ? 'source-map': ''
};
