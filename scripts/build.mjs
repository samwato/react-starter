#!/usr/bin/env node

import * as esbuild from 'esbuild'

let result = await esbuild.build({
  assetNames: '../public/[name]-[hash]',
  bundle: true,
  define: { IS_DEV: 'false' },
  entryPoints: ['./src/index.jsx'],
  loader: {
    '.jpg': 'file',
    '.png': 'file',
    '.svg': 'file',
  },
  metafile: true,
  minify: true,
  sourcemap: true,
  sourcesContent: false,
  outdir: 'www/assets',
})

console.log(await esbuild.analyzeMetafile(result.metafile))
