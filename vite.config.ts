import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'HClient',
            fileName: format => {
                if (format === 'es') return 'index.mjs';
                if (format === 'cjs') return 'index.cjs';
                if (format === 'umd') return 'index.umd.cjs';
                return 'index.js';
            },
            formats: ['es', 'cjs', 'umd'],
        },
        minify: true,
        rollupOptions: {
            external: ['axios', 'base-64'],
            output: {
                exports: 'named',
                globals: {
                    axios: 'axios',
                    'base-64': 'BASE64',
                },
            },
            plugins: [
                babel({
                    babelHelpers: 'bundled',
                    exclude: 'node_modules/**',
                    presets: [['@babel/preset-env', { targets: 'defaults' }]],
                    extensions: ['.js', '.ts'],
                }),
            ],
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['./src/**/*.ts'],
            exclude: ['**/*.test.ts'],
            rollupTypes: true,
        }),
    ],
});
