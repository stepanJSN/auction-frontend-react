module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'react-app',
  ],
  plugins: ['react', 'react-refresh', '@arthurgeron/react-usememo'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'eol-last': ['error', 'always'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@arthurgeron/react-usememo/require-usememo': 'warn',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['**/*.test.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}'],
      rules: {
        '@arthurgeron/react-usememo/require-usememo': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      defaultVersion: '',
      propWrapperFunctions: [
        'forbidExtraProps',
        { property: 'freeze', object: 'Object' },
        { property: 'myFavoriteWrapper' },
        { property: 'forbidExtraProps', exact: true },
      ],
      componentWrapperFunctions: [
        'observer',
        { property: 'styled' },
        { property: 'observer', object: 'Mobx' },
        { property: 'observer', object: '<pragma>' },
      ],
      formComponents: [
        'CustomForm',
        { name: 'SimpleForm', formAttribute: 'endpoint' },
        { name: 'Form', formAttribute: ['registerEndpoint', 'loginEndpoint'] },
      ],
      linkComponents: [
        'Hyperlink',
        { name: 'MyLink', linkAttribute: 'to' },
        { name: 'Link', linkAttribute: ['to', 'href'] },
      ],
    },
  },
};
