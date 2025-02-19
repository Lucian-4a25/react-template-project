const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
        },
        // 新增 SCSS 规则
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
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
      new MiniCssExtractPlugin({
          filename: 'static/styles/[name].[contenthash].css', // 输出的 CSS 文件名
          chunkFilename: 'static/styles/[name].[contenthash].css', // 用于代码分割的 CSS 块文件名
      }),
      new webpack.DefinePlugin({
          'process.env': JSON.stringify(env)
      }),
      // 开启 Gzip 压缩
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240, // 只压缩 10kb 以上的文件
        minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
      }),
      // 打包分析
      process.env.ANALYZE && new BundleAnalyzerPlugin(),
    ].filter(Boolean),

    optimization: {
      // 代码分割配置
      splitChunks: {
        chunks: 'all',
        minSize: 20000, // 生成 chunk 的最小体积 20kb
        maxSize: 244000, // chunk 的最大体积 244kb
        minChunks: 1, // 最小被引用次数
        maxAsyncRequests: 30, // 按需加载时的最大并行请求数
        maxInitialRequests: 30, // 入口点的最大并行请求数
        automaticNameDelimiter: '~', // 名称分隔符
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            name: 'react',
            priority: 100,
            maxSize: 1000 * 1000,
            enforce: true,
            reuseExistingChunk: true,
          },
          // 添加更多的拆分，如 UI 库，工具库等...
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      // 运行时代码分离，便于优化打包后的代码，避免业务代码变更影响导致其包含的 runtime 代码也无法重复使用的问题，更好的利用缓存
      runtimeChunk: {
        name: 'runtime',
      },
      // 压缩配置
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true, // 开启并行压缩
          terserOptions: {
            compress: {
              drop_console: true, // 删除 console
              drop_debugger: true, // 删除 debugger
            },
            format: {
              comments: false, // 删除注释
            },
          },
          extractComments: false, // 不将注释提取到单独的文件
        }),
      ],
    },  
});