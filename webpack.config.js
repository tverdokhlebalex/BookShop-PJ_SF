const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug', 
    }),
    new CopyWebpackPlugin({
        patterns: [{
        from: path.join(__dirname, 'src', 'images'),
        to: path.join(__dirname, 'dist', 'images'),
    },
    ],
    }),
  ],
  module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
      {
        test: /\.pug$/, 
        loader: 'pug-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
