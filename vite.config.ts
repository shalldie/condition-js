/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts()],

    build: {
        lib: {
            entry: path.join(__dirname, 'src/condition-js.ts'),
            name: 'ConditionJS',
            fileName: format => `condition-js.${format}.js`
        }
    },

    test: {
        // globals: true
    }
});
