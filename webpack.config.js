var webpack = require('webpack');
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});


process.env.NODE_ENV = process.env.NODE_ENV || 'development';




module.exports = {
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'

    },
    resolve:{
        modules: [__dirname, 'node_modules', './app/api' ],
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {loader:'babel-loader', options:{presets:['react', 'es2015', 'stage-0'] } }

            },
            {
                test:/\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test:/\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                 test: /\.(ttf|eot|png)$/,
                 loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
//            {
//                 test: /\.html$/,
//                 loader: 'file-loader?name=[name].[ext]',
//                 exclude: path.resolve(__dirname, 'app/index.html')
//            }
               ]
    },
    plugins: [
    extractPlugin,    
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
        template: 'app/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'users.html',
      template: 'app/html/users.html'
    })
    ],
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'

}
