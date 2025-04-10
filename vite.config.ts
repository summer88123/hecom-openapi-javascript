import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'HClient',
            fileName: 'index',
        },
        minify: true,
        rollupOptions: {
            external: ['axios', 'base-64'],
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
