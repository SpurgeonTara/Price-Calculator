import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import babelParser from '@babel/eslint-parser';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  ...compat.extends('airbnb-base'),
  // ...compat.env({
  //   jest: true,
  // }),
  {
    rules: {
      'space-before-function-paren': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      semi: ['error', 'always'],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 'off',
      'no-console': 'off',
      'consistent-return': 'off',
      'import/extensions': 'off',
      camelcase: 'off',
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        babelOptions: {
          babelrc: false,
          configFile: false,
          // your babel options
          // presets: ['@babel/preset-env'],
        },
      },
    },
    plugins: { import: importPlugin },
  },
];
