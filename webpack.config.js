var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

const config = {
    mode: "development",
    output: {
        filename:'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: 'assets/'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".jsx", ".json"]
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: 'index'
        })
    ]
}

module.exports = config;