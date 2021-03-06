const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = '/'

module.exports = (options = {}) => ({
    entry: {
        vendor: './src/vendor.js',
        index:  "./src/main.js"
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename:options.dev ?'[name].js':'[name].[chunkhash].js',
        chunkFilename: options.dev ?'[name].js':'[name].[chunkhash].js',
        publicPath:publicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'less-loader', 'postcss-loader']
        }, {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/images/[name].[ext]?.[hash]'
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
           
        })
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src')
            
        }
    },
    devServer: {
        disableHostCheck: true,
        compress: true,
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            '/apis': {
                target: 'http://localhost:8092',
                secure: false,
                changeOrigin: true

            }
        },

        historyApiFallback: {
            index: url.parse(options.dev ? publicPath : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
})