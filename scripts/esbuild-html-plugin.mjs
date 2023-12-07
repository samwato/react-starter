import fsPromise from 'node:fs/promises'
import path from 'node:path'
import prettier from 'prettier'
import * as jsdom from 'jsdom'

const { JSDOM } = jsdom

/**
 * htmlPlugin - A plugin for esbuild that generates an HTML file based on a template
 *
 * @param {string} config.template - The path to the HTML template file
 * @param {string} config.title - The title for the generated HTML file
 * @param {string} config.favicon - The path to the favicon file
 * @throws {Error} Throws an error if the template is not provided
 * @throws {Error} Throws an error if the "outdir" is not specified in the initial options
 * @returns {Object} - The esbuild plugin object with setup function
 */
export function htmlPlugin(config) {
  if (!config.template) {
    throw new Error('htmlPlugin required template.')
  }

  return {
    name: 'esbuild-html-plugin',
    setup(build) {
      build.onStart(() => {
        if (!build.initialOptions.outdir) {
          throw new Error('Please specify an "outdir" in the initial options.')
        }
      })

      build.onEnd(async (result) => {
        const template = await fsPromise.readFile(
          new URL(config.template, import.meta.url),
          'utf-8',
        )
        const dom = new JSDOM(template)

        if (config.template) {
          dom.window.document.title = config.title
        }

        if (config.favicon) {
          const faviconFilename = path.basename(config.favicon)
          const faviconLinkEl = dom.window.document.createElement('link')
          faviconLinkEl.setAttribute('rel', 'icon')
          faviconLinkEl.setAttribute('href', `/assets/${faviconFilename}`)
          if (path.extname(config.favicon) === '.svg') {
            faviconLinkEl.setAttribute('type', 'image/svg+xml')
          }

          dom.window.document.head.appendChild(faviconLinkEl)

          await fsPromise.copyFile(
            new URL(config.favicon, import.meta.url),
            `www/assets/${faviconFilename}`,
          )
        }

        Object.keys(result.metafile.outputs).forEach((filepath) => {
          switch (path.extname(filepath)) {
            case '.js':
              const scriptEl = dom.window.document.createElement('script')
              scriptEl.setAttribute('type', 'module')
              scriptEl.setAttribute('crossorigin', '')
              scriptEl.setAttribute('src', `/${path.basename(filepath)}`)

              dom.window.document.head.appendChild(scriptEl)
              return
            case '.css':
              const linkEl = dom.window.document.createElement('link')
              linkEl.setAttribute('rel', 'stylesheet')
              linkEl.setAttribute('crossorigin', '')
              linkEl.setAttribute('href', `/${path.basename(filepath)}`)

              dom.window.document.head.appendChild(linkEl)
              return
            default:
              return
          }
        })

        await fsPromise.writeFile(
          `www/index.html`,
          await prettier.format(dom.serialize(), { parser: 'html' }),
          'utf-8',
        )
      })
    },
  }
}
