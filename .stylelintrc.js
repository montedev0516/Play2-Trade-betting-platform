module.exports = {
  customSyntax: 'postcss-html',
  extends: ['stylelint-config-recess-order', 'stylelint-config-recommended-vue/scss'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'block-no-empty': true,
    'no-descending-specificity': null
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: ['public/**/*.css', 'dist/**/*.css']
}
