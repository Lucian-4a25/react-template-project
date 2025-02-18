const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[contenthash].js',
    publicPath: '/',
    assetModuleFilename: 'static/images/[name].[contenthash].[ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(ts|tsx)$/,  // 添加 ts 和 tsx
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isProd ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // 如果需要，可以在这里添加公共路径配置
                  // publicPath: '../'
                },
            } : 'style-loader',
            'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // dependency: { not: ['url'] },
        type: 'asset/resource',
        parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb以下使用base64内联
            },
        },
        generator: {
            filename: 'static/images/[name].[contenthash].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
        '@styles': path.resolve(__dirname, 'src/assets/styles'),
        '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@services': path.resolve(__dirname, 'src/services'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: 'static/styles/[name].[contenthash].css', // 输出的 CSS 文件名
        chunkFilename: 'static/styles/[name].[contenthash].css', // 用于代码分割的 CSS 块文件名
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true
  }
};