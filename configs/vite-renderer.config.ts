import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjsExternals from 'vite-plugin-commonjs-externals';
import builtinModules from 'builtin-modules';
import { escapeRegExp } from 'lodash';

import pkg from '../package.json'

const commonjsPackages = [
  'electron',
  'electron/main',
  'electron/common',
  'electron/renderer',
  'original-fs',
  ...builtinModules,
  ...Object.keys(pkg.dependencies).map(
    name => new RegExp('^' + escapeRegExp(name) + '(\\/.+)?$')
  ),
] as const;

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/renderer'),
  plugins: [react(), commonjsExternals({ externals: commonjsPackages })],
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
})
