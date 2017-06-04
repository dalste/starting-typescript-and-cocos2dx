var webpack = require('webpack'),
    path = require('path');


var WriteFilePlugin =require('write-file-webpack-plugin') ;

module.exports = {
    context: __dirname + '/tssrc',
    entry: {
      index: './Bootstrap.ts'
    },
    output: {
        path: __dirname + '/src',
        publicPath:  __dirname + '/',
        library:"CocosTSGame",

        filename: 'applicationbundle.js'
    },
    plugins:[
      new WriteFilePlugin()
    ],
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