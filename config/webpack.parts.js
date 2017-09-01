const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//// ==== code ==== ////

exports.loadJavaScript = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include, // PATHS.src
        exclude,
        loader: ['babel-loader'],
      }
    ],
  },
});

//// ===== styling ==== ////

exports.loadStyles = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include,
        exclude,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: { sourceMap: true }},
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader', options: { sourceMap: true }},
        ],
      }
    ],
  },
})

exports.extractCSS = ({ include, exclude, use } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          include,
          exclude,

          use: plugin.extract({
            use, // how to load the files
            fallback: 'style-loader',
          })
        }
      ]
    },
    plugins: [ plugin ] // make sure the plugin is included in the 'bootstrapping'
  }
}

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  }
})

//// ==== Dev Server ==== ////

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    hotOnly: true, // hmr
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,
    stats: 'errors-only', // Display only errors to reduce the amount of output.
    host, // Defaults to `localhost`
    port // Defaults to 8080
  },

  plugins: [ // hmr
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});

//// ==== setup ==== /////

exports.htmlWebpackPlugin = () => ({
  plugins: [
    new HtmlWebpackPlugin({ title: 'Client Boiler'}),
  ],
});
