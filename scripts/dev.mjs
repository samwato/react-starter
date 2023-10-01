#!/usr/bin/env node

import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  assetNames: '../public/[name]-[hash]',
  bundle: true,
  define: { IS_DEV: 'true' },
  entryPoints: ['./src/index.jsx'],
  loader: {
    '.jpg': 'file',
    '.png': 'file',
    '.svg': 'file',
  },
  outdir: 'www/assets',
})

await ctx.watch()

let { port } = await ctx.serve({
  fallback: 'www/index.html',
  servedir: 'www',
})

console.log(`Local: http://127.0.0.1:${port}`)
