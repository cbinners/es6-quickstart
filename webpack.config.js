'use strict';
export default {
    entry: {
      client: './web/client/index.js'
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: 'public/[name]/bundle.js',
        chunkFilename: 'public/[id]/bundle.js',
    },
    plugins: [],
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
      ]
    }
};
