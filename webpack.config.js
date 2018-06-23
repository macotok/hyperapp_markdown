const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', 'jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/js'),
  },
};
