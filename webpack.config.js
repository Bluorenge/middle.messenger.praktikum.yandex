const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : false,
    devServer: {
        compress: true,
        port: 3000,
        historyApiFallback: true,
        hot: isDev,
    },
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'messenger.[fullhash].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    precompileOptions: {
                        knownHelpersOnly: false,
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: isDev ? {} : { publicPath: '../' },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html',
            minify: {
                collapseWhitespace: !isDev,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[fullhash].css',
        }),
        new CleanWebpackPlugin({
            protectWebpackAssets: false,
            cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
        }),
    ],
};
