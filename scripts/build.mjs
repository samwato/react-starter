#!/usr/bin/env node

import * as esbuild from 'esbuild'
import { htmlPlugin } from './esbuild-html-plugin.mjs'

let result = await esbuild.build({
  assetNames: 'assets/[name]-[hash]',
  bundle: true,
  define: {
    IS_DEV: 'false',
  },
  chunkNames: '[name].chunk.[hash]',
  entryNames: '[name].bundle.[hash]',
  entryPoints: ['src/index.jsx'],
  format: 'esm',
  legalComments: 'eof',
  loader: {
    '.jpg': 'file',
    '.png': 'file',
    '.svg': 'file',
  },
  metafile: true,
  minify: true,
  outdir: 'www',
  platform: 'browser',
  plugins: [
    htmlPlugin({
      favicon: '../public/favicon.svg',
      template: '../public/index.html',
      title: 'React Starter',
    }),
  ],
  sourcemap: true,
  sourcesContent: false,
  splitting: true,
  target: ['es6'],
})

console.log(await esbuild.analyzeMetafile(result.metafile))
