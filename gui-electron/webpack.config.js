const path = require('path');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const FontminPlugin = require('fontmin-webpack')

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = () => {
    return {
        /**
         * Entry and output points
         */
        entry: {
            main: './src/index.js'
        },
        output: {
            filename: 'chunk.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: './'
        },
        // =======================================
        /**
         * Loaders
         */
        module: {
            rules: [
                {
                    test: /^(?!.*\.test\.js$).*\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'imgs/'
                            }
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                }
            ]
        },
        // =======================================
        plugins: [
            /**
             * Copy all files from public folder to static website folder
             */
            new CopyPlugin([
                { from: './public', to: '.' }
            ]),
            /**
             * Generate html entry point from template
             */
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            /**
             * Remove unused css
             */
            new PurgecssPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            }),
            /**
             * Minify fonts files
             */
            new FontminPlugin({
                autodetect: true
            })
        ],
        optimization: {
            /**
             * Reduce files size by removing unnecessary lines
             */
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js$/,
                    exclude: /node_modules/,
                    sourceMap: true,
                    uglifyOptions: {
                        compress: {},
                        mangle: true,
                    }
                }),
            ],
            /**
             * Split js script (custom code and node_modules)
             */
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        /**
         * Remove warnings about js size
         */
        performance: {
            hints: false
        }
    };
}