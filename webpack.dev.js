const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const dotenv = require('dotenv');
const webpack = require('webpack');

// 加载环境变量
const env = dotenv.config({
  path: path.resolve(__dirname, '.env.development')
}).parsed;

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 新增 SCSS 规则
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              postcssOptions: {
                plugins: [
                  'autoprefixer', // 自动添加浏览器前缀
                  'postcss-preset-env', // 使用最新的 CSS 特性
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              sassOptions: {
                outputStyle: 'compressed', // 压缩 CSS 输出
              },
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['/node_modules/'],
      fix: false, // 自动修复问题
      failOnError: true, // 遇到 ESLint 错误时终止构建
      emitWarning: true, // 输出警告到控制台
      emitError: true, // 输出错误到控制台
      overrideConfigFile: path.resolve(__dirname, 'eslint.config.js'), // 指定配置文件路径
      // 需要改为 flat 支持对应的配置文件格式
      configType: "flat",
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    client: {
      overlay: false // 这将禁用浏览器中的错误覆盖层
    }
  }
});