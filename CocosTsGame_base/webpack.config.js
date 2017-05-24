var webpack = require('webpack'),
    path = require('path');
module.exports = {
    context: __dirname + '/tssrc',
    entry: {
      index: './Bootstrap.ts'
    },
    output: {
        path: __dirname + '/src',
        publicPath: '/',
        library:"CocosTSGame",

        filename: 'applicationbundle.js'
    },
    resolve: {
      modules: [__dirname ,"node_modules"],
      extensions: [ '.ts', '.js']
    },
    module: {
      loaders: [
        { test: /\.ts$/, loaders: ['ts-loader'], exclude: /node_modules/ }
      ]
    }
}