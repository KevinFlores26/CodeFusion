import { build } from 'esbuild'
import { resolvePath } from '../src/utils/utils.js'
import regex from '../src/utils/regex.js'

export default async function bundleFiles(objectEntry, assets, bundle = true) {
  if (!objectEntry) return null
  const entries = objectEntry.entryFiles.map((file) => file.path)
  const inputFiles = {}

  objectEntry.entryFiles.forEach((file) => {
    inputFiles[file.path] = file.content
  })

  const virtualFilesPlugin = {
    name: 'virtual-files',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (args.path in inputFiles) return { path: args.path, namespace: 'virtual' }
        if (args.namespace === 'virtual' && regex.notExtUrl.test(args.path)) {
          const resolvedPath = resolvePath(args.path) 
          const file = assets.find((f) => f.path === resolvedPath)

          if (file) {
            inputFiles[args.path] = file.content
            return { path: args.path, namespace: 'virtual' }
          }
        }

        return { path: args.path, external: true }
      })

      build.onLoad({ filter: /.*/, namespace: 'virtual' }, (args) => {
        return { contents: inputFiles[args.path], loader: args.path.endsWith('.css') ? 'css' : 'js' }
      })
    }, 
  }

  const result = await build({
    entryPoints: entries,
    platform: 'node',
    format: 'esm',
    bundle,
    write: false,
    outdir: 'temp-out-esbuild',
    metafile: true,
    plugins: [virtualFilesPlugin],
  })

  console.log('result', result)
  return result
}
