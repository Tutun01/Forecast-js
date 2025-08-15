

const path = require('path');
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: 'production',
    entry: './src/script.js',
    output: {
        filename: 'script.min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                type: 'javascript/esm',
            },
        ],
    },
};