import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginImport from 'eslint-plugin-import';

let withNuxt;
try {
    // Dynamically import the Nuxt-generated ESLint config if it exists.
    // eslint-disable-next-line n/global-require, import/no-dynamic-require
    withNuxt = (await import('./.nuxt/eslint.config.mjs')).default;
} catch {
    // Fallback: wrap the provided config and ensure the TypeScript ESLint plugin is registered.
    withNuxt = (cfg) => ({
        ...cfg,
        plugins: {
            ...(cfg.plugins || {}),
            '@typescript-eslint': tseslint,
            n: eslintPluginN,
            import: eslintPluginImport,
        },
        languageOptions: {
            ...(cfg.languageOptions || {}),
            parser: tsParser,
        },
    });
}

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
