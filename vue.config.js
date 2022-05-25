const webpack = require('webpack')

process.env.NODE_ENV = process.env.VUE_APP_TEST === 'localhost' ? 'localhost' : process.env.NODE_ENV;
console.log(process.env.NODE_ENV);

const baseURL = process.env.NODE_ENV === 'production'
    ? 'http://service.zipgobuild.com'
        : (process.env.NODE_ENV === 'development' ? 'http://dev-service.zipgobuild.com' : 'http://localhost:3000') ;

const baseFrontURL = process.env.NODE_ENV === 'production'
    ? 'http://www.zipgobuild.com'
        : (process.env.NODE_ENV === 'development' ? 'http://dev.zipgobuild.com' : 'http://localhost:8080') ;

console.log('vue.config.js::NODE_ENV::', process.env.NODE_ENV, typeof process.env.NODE_ENV);
console.log('vue.config.js::baseURL::', baseURL);
console.log('vue.config.js::baseFrontURL::', baseFrontURL);

module.exports = {
    lintOnSave: false,
    publicPath: process.env.VUE_BASE_URL || '/',
    productionSourceMap: false,
    configureWebpack: {
        module: {
            // Fix for flot resize
            rules: [{
                test: /jquery\.flot\.resize\.js$/,
                use: 'imports-loader?this=>window'
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.baseURL' : JSON.stringify(baseURL),
                'process.env.baseFrontURL' : JSON.stringify(baseFrontURL)
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    transpileDependencies: [
        'resize-detector' // vue-echarts
    ]
}
