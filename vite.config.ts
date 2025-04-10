import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'HClient',
            fileName: 'index',
        },
        minify: 'terser',
        terserOptions: {
            format: {
                comments: false,
            },
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['./src/**/*.ts'],
            exclude: ['**/*.test.ts'],
        }),
    ],
});
