import { create } from 'zustand'
import { bundleFilesAPI } from '@src/services/api'
import useOutputStore from './useOutputStore'
import { getProjectFiles, getEntryPoints, shouldRebuild } from '@utils/buildHelpers'

// Store
const buildsValue = await setupBuilds()
const useBuildStore = create((set) => ({
  builds: buildsValue,
  setBuilds: async (fileId) => {
    const newBuilds = await rebuild(fileId)
    console.log('newBuilds', newBuilds)
    set((state) => {
      if (newBuilds) return { builds: newBuilds }
      return { builds: state.builds }
    })
  },
  clearBuilds: () => set({ builds: '' }),

  updateOutputFiles: (outputFiles, paths, reference) =>
    set((state) => {
      const newBuilds = updateOutFiles(outputFiles, paths, reference)
      if (newBuilds) return { builds: newBuilds }
      return { builds: state.builds }
    }),
  getDoc: () => useOutputStore.getState().doc,
  updateDoc: (doc) => useOutputStore.getState().setDoc(doc),
}))

// Helpers
async function setupBuilds() {
  const { project, files } = await getProjectFiles()
  const htmlFiles = files.filter((file) => file.type === 'html')
  const assets = files.filter((file) => file.type !== 'html')

  try {
    const entryPoints = await getEntryPoints(project, htmlFiles)
    const bundledFiles = await bundleFilesAPI(entryPoints, assets)
    return bundledFiles
  } catch (err) {
    console.error('error bundling files: ', err)
  }
}

async function rebuild(fileId) {
  const prevBuilds = useBuildStore.getState().builds

  if (await shouldRebuild(fileId, prevBuilds)) return await setupBuilds()
  console.log('should not rebuild')
  return null
}

function updateOutFiles(outputFiles, paths, reference) {
  let prevBuilds = [...useBuildStore.getState().builds]
  const targetBuild = prevBuilds.find((build) => build.referenceData.htmlId === reference)

  if (!targetBuild) return null
  const indexToRemove = prevBuilds.findIndex((build) => build.referenceData.htmlId === reference)

  if (indexToRemove === -1) return null
  targetBuild.outputFiles = outputFiles
  const prevPaths = [...targetBuild.referenceData.paths]
  paths.forEach((path) => {
    const pathIndex = prevPaths.indexOf(path)
    if (pathIndex !== -1) prevPaths.splice(pathIndex, 1)
  })

  targetBuild.referenceData.paths = prevPaths
  prevBuilds.splice(indexToRemove, 1, targetBuild)
  const newBuilds = [...prevBuilds]

  return newBuilds
}

export default useBuildStore
