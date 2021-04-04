module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb/base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'linebreak-style': 0,
        'prefer-template': 0,
        'arrow-parens': ['error', 'always'],
        indent: ['off', 2],
        'newline-per-chained-call': 0,
        'operator-linebreak': ['error', 'after'],
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
            },
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'max-len': [
            'error',
            500,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'no-useless-constructor': 0,
        'import/no-unresolved': 0,
        'no-console': 0,
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
        'jsx-a11y/iframe-has-title': 'off',
        'jsx-a11y/no-distracting-elements': 'off',
        'jsx-a11y/no-redundant-roles': 'off',
    },
    plugins: [
        'react',
        'jsx-a11y',
        'import',
    ],
};
