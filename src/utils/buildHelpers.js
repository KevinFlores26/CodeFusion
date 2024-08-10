import { getProjectsBy, getFilesBy } from '@db/idb/playground/crud'
import { resolvePath } from '@utils/utils'
import regex from '@utils/regex'
import useBuildStore from '@store/useBuildStore'

// setupBuilds() Helpers
export async function getProjectFiles() {
  const projectName = localStorage.getItem('projectName')
  try {
    const project = await getProjectsBy({ name: projectName }, true)
    const files = await getFilesBy({ projectId: project.id })

    return { project, files }
  } catch (err) {
    console.error('error getting projects or files: ', err)
  }
}

export async function getEntryPoints(project, files) {
  let entryPoints = []
  let paths = []

  for (const html of files) {
    paths = getHtmlPathAssets(html)
    let entryFiles = []

    if (paths.length > 0) {
      for (const path of paths) {
        const projectId = typeof project === 'number' ? project : project.id
        const file = await getFilesBy({ projectId, path }, true)
        if (file) entryFiles.push(file)
      }
    }

    const entryPointObject = { htmlId: html.id, htmlPath: html.path, htmlContent: html.content, entryFiles, paths }
    entryPoints = [...entryPoints, entryPointObject]
    paths = []
  }

  console.log('entryPoints', entryPoints)
  return entryPoints
}

export function getHtmlPathAssets(html) {
  if (!html || !html.content === '') return null
  const styles = html.content.match(regex.notExtLStyle)
  const scripts = html.content.match(regex.notExtScript)

  const paths = []
  if (styles && styles?.length > 0) styles.forEach((style) => paths.push(getPathFromTag(style)))
  if (scripts && scripts?.length > 0) scripts.forEach((script) => paths.push(getPathFromTag(script)))

  return paths

  function getPathFromTag(opTag) {
    const url = opTag.match(regex.srcHref).pop()
    if (!url) return null

    let path = url.replace('"', '').replace("'", '').replace('src=', '').replace('href=', '')
    if (path.endsWith('"') || path.endsWith("'") || path.endsWith('/')) path = path.slice(0, -1)
    const resolvedPath = resolvePath(path)

    if (!resolvedPath) return null
    return resolvedPath
  }
}

// setBuilds() Helpers
export async function shouldRebuild(fileId, prevBuilds) {
  const file = await getFilesBy({ id: fileId }, true)
  return await evaluateBuilds(prevBuilds) // => boolean

  async function evaluateBuilds(prevBuilds) {
    if (file.name.split('.').pop() !== 'html') return true
    const targetBuild = prevBuilds?.find((build) => build.referenceData.htmlId === file.id)

    if (!targetBuild) return true
    const prevPaths = [...targetBuild.referenceData.paths]
    const currentPaths = getHtmlPathAssets(file)

    if (!currentPaths || currentPaths?.length === 0) return true
    if (currentPaths.length > prevPaths.length || currentPaths.length < prevPaths.length) return true
    if (await checkImports(currentPaths, targetBuild)) return true

    return false
  }

  async function checkImports(currentPaths, targetBuild) {
    let prevPaths = [...targetBuild.referenceData.paths]

    if (await filterDifferentPaths()) return true
    if (prevPaths.length === 0) return false

    let files = [...targetBuild.outputFiles]
    const doc = useBuildStore.getState().getDoc()

    purgeDocument()
    return false

    // Local helpers
    async function filterDifferentPaths() {
      for (const path of currentPaths) {
        if (prevPaths.includes(path)) {
          const pathIndex = prevPaths.indexOf(path)
          prevPaths.splice(pathIndex, 1)
          continue
        }

        const projectName = localStorage.getItem('projectName')
        const project = await getProjectsBy({ name: projectName }, true)
        const importedFile = await getFilesBy({ projectId: project?.id, path }, true)

        if (importedFile) return true
      }
    }

    function purgeDocument() {
      const updateDocument = (update) => useBuildStore.getState().updateDoc(update)
      const updateOFiles = (f, pPath, refId) => useBuildStore.getState().updateOutputFiles(f, pPath, refId)

      for (const path of prevPaths) {
        let replaceRegex = {
          script: new RegExp(`<script .*?data-bundling-path=["']${path}["'][\\s\\S]*?<\\/script>`),
          style: new RegExp(`<style .*?data-bundling-path=["']${path}["'][\\s\\S]*?<\\/style>`),
        }
  
        const type = path.split('.').pop()
        const correctRegex = type === 'css' ? replaceRegex.style : replaceRegex.script
  
        if (doc.match(correctRegex)) {
          updateDocument(doc.replace(correctRegex, ''))
          const pathSplit = 'temp-out-esbuild'
          const indexToRemove = files.findIndex((file) => file.path.split(pathSplit).pop().replace('\\', '/') === path)
  
          if (indexToRemove !== -1) files.splice(indexToRemove, 1)
        }
      }

      updateOFiles(files, prevPaths, targetBuild.referenceData.htmlId)
    }
  }
}
