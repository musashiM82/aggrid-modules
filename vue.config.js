const pkjson = require('./package.json');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const fileVersion = isProduction ? '.' + pkjson.version : '';
const bundleName = process.env.APP_TARGET === 1 ? 'backoffice' : 'trading-tool';

module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        output: {
            filename: 'js/' + bundleName + fileVersion + '.js',
            chunkFilename: 'js/[name]' + fileVersion + '.js'
        },
        devtool: 'sourcemap',
        plugins: [
            new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, reportFilename: './report.html' })
        ]
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    }
};
