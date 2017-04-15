require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Prodの時はtrue
const prodMode = process.argv.includes('--env.production');

// 共通プラグイン
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'public/index.html'),
  })
];

// Prodのみに反映するプラグイン
if (prodMode) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: false,
        warnings: false,
      },
      comments: false
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    port: 5656,
    inline: true,
  },
  plugins,
  devtool: prodMode ? false : 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  }
};