const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const PATHS = require('./paths');

const commonConfig = merge([

  {
    entry: {
      main: ['babel-polyfill', 'react-hot-loader/patch', PATHS.app ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [],
  },

  parts.loadJavaScript(),
  parts.htmlWebpackPlugin(),
])

/// ==== development ==== ////

const developmentConfig = merge([
  parts.loadStyles(),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
])

/// ==== production ==== ////

const productionConfig = merge([

  parts.extractCSS({
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader', options: { sourceMap: true }},
      parts.autoprefix(), // this one is interesting...
      {loader: 'resolve-url-loader'},
      {loader: 'sass-loader', options: { sourceMap: true }},
    ]
  }),
])

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
