#!/usr/bin/env node --env-file=.env

import * as esbuild from 'esbuild'
import { htmlPlugin } from './esbuild-html-plugin.mjs'
import { getPublicEnvs } from './common.mjs'

const port = parseInt(process.env.PORT) || 8000

let ctx = await esbuild.context({
  assetNames: 'assets/[name]-[hash]',
  bundle: true,
  define: {
    IS_DEV: 'true',
    ...getPublicEnvs(),
  },
  entryNames: '[name].bundle.[hash]',
  entryPoints: ['./src/index.jsx'],
  format: 'esm',
  loader: {
    '.jpg': 'file',
    '.png': 'file',
    '.svg': 'file',
  },
  metafile: true,
  outdir: 'www',
  platform: 'browser',
  plugins: [
    htmlPlugin({
      favicon: '../public/favicon.svg',
      template: '../public/index.html',
      title: 'React Starter',
    }),
  ],
  target: ['es6'],
})

await ctx.watch()

await ctx.serve({
  fallback: 'www/index.html',
  servedir: 'www',
  port,
})

console.log(`Local: http://127.0.0.1:${port}`)
