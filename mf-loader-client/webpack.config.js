module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    index: './src/index.ts',
  },
  output: {
    publicPath: 'http://localhost:3007/',
    filename: '[name].js',
    libraryTarget: 'umd',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
        },
      },
    ],
  },
};
