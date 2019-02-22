const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: {
        '/': './src/index.js',
        'about': './src/about/index.js',
        'contact': './src/contact/index.js',
        'shop': './src/shop/index.js',
        'music': './src/music/index.js',
        'videos': './src/videos/index.js'
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === "/" ? 'index.js' : '[name]/index.js';
        },
        path: buildPath
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]',
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }  
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks: ['/'],
            filename: './index.html', //relative to root of the application,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './src/about/index.html',
            chunks: ['about'],
            filename: './about/index.html' ,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './src/contact/index.html',
            chunks: ['contact'],
            filename: './contact/index.html' ,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './src/shop/index.html',
            chunks: ['shop'],
            filename: './shop/index.html' ,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './src/music/index.html',
            chunks: ['music'],
            filename: './music/index.html' ,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './src/videos/index.html',
            chunks: ['videos'],
            filename: './videos/index.html' ,
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
    ]
};
