module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "./src/assets/sass/prepends.sass"',
      },
    },
  },
}
