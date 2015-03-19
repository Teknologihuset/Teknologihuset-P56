module.exports = {
    options: {
        separator: '\n'
    },
    dist: {
        src: ['app.js', 'app/mixins/*.js', 'app/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
    }
};
