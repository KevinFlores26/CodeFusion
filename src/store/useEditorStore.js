import { create } from 'zustand'
import { getProjectsBy } from '@db/idb/playground/crud'
import { mimeTypes } from '@utils/objects'

// Store
const storedEditors = await setupEditors()
const editorsValue = typeof storedEditors?.then === 'function' || !storedEditors ? editorsFallback() : storedEditors

const useEditorStore = create((set) => ({
  editors: editorsValue,
  setEditor: (index, editor) => {
    set((state) => {
      const newEditors = [...state.editors]
      newEditors[index] = editor
      localStorage.setItem('editors', JSON.stringify(newEditors))

      return { editors: newEditors }
    })
  },
}))

// Helpers
async function setupEditors() {
  const projectName = localStorage.getItem('projectName')
  let editors = JSON.parse(localStorage.getItem('editors'))

  if (editors && editors?.length > 0) return editors
  if (projectName) {
    const project = await getProjectsBy({ name: projectName }, true)
    editors = project?.activeEditors || null
  }

  if (!editors || editors?.length === 0) return null
  localStorage.setItem('editors', JSON.stringify(editors))

  return editors
}

function editorsFallback() {
  const editorsBase = [
    // id: id of the file
    { id: 1, path: '/index.html', name: 'index.html', ext: 'html', type: mimeTypes['html'], parentId: null, projectid: 1 },
    { id: 2, path: '/style.css', name: 'style.css', ext: 'css', type: mimeTypes['css'], parentId: null, projectid: 1 },
    { id: 3, path: '/script.js', name: 'script.js', ext: 'js', type: mimeTypes['js'], parentId: null, projectid: 1 },
  ]
  return editorsBase
}

export default useEditorStore
