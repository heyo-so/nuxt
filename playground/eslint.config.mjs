import withNuxt from './.nuxt/eslint.config.mjs';
import globals from 'globals';

export default withNuxt({
    rules: {
        'vue/html-self-closing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-mutating-props': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                args: 'after-used',
                vars: 'all',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': 'off',
    },
    files: ['**/*.ts', '**/*.vue', '**/*.js'],
    languageOptions: {
        globals: { ...Object.entries(globals.browser).reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {}), ...Object.entries(globals.node).reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {}) },
    },
});
