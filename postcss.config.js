/* eslint-disable global-require */
module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({
            browsers: ['> 0%'],
            grid: true,
            flexbox: true,
        }),
        require('cssnano'),
    ],
};
/* eslint-enable global-require */
