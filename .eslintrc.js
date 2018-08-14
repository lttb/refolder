'use strict'

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended',
  ],

  rules: {
    'no-unused-expressions': 'off',
    'no-multi-assign': 'off',
    semi: ['error', 'never'],
    'object-curly-spacing': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-underscore-dangle': 'off',

    'func-names': 'off',

    'import/prefer-default-export': 'off',

    'flowtype/no-unused-expressions': 'error',
    'flowtype/generic-spacing': 'off',
  },

  plugins: ['flowtype'],
}
