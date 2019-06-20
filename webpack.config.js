var HtmlWebpackPlugin = require('html-webpack-plugin');
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
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".jsx", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: 'index'
        })
    ]
}

module.exports = config;