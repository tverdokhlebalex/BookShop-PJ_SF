var path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'main.js'
    },
    mode: 'development',
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
          { 
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'] }
        ]
      },
      optimization: {
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
  };
