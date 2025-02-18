const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { default: merge } = require('webpack-merge');
const common = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 加载环境变量
const env = dotenv.config({
    path: path.resolve(__dirname, '.env.production')
}).parsed;    

module.exports = merge(common, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
             {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // 如果需要，可以在这里添加公共路径配置
                    // publicPath: '../'
                  },
             },
             'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
          filename: 'static/styles/[name].[contenthash].css', // 输出的 CSS 文件名
          chunkFilename: 'static/styles/[name].[contenthash].css', // 用于代码分割的 CSS 块文件名
      }),
      new webpack.DefinePlugin({
          'process.env': JSON.stringify(env)
      }),
      new BundleAnalyzerPlugin()
    ]
});