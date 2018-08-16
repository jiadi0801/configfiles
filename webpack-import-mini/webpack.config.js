const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  }
};
