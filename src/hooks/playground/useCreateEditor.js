import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useEffect, useMemo, useRef } from 'react'
import useEditorStore from '@store/useEditorStore'
import { getFile } from '@db/idb/playground/crud'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'css') {
      return new cssWorker()
    }
    if (label === 'html') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    
    return new editorWorker()
  },
}

const DEFAULT_OPTIONS = {
  automaticLayout: true,
  theme: 'vs-dark',
}

const javascriptBased = ['js', 'ts', 'jsx', 'tsx', 'vue']
localStorage.setItem('editorsLeft', 3)

export default function useCreateEditor(containerRef, editorId) {
  const editorInstace = useRef(null)
  const editorData = useEditorStore((state) => state.editors[editorId])
  const memoEditor = useMemo(() => editorData, [editorData])

  useEffect(() => {
    const currentEditor = containerRef.current

    async function createEditor() {
      const file = await getFile(memoEditor.id)
      const content = file.content || ''
      const type = file.type || 'txt'

      const newEditor = monaco.editor.create(currentEditor, {
        value: content,
        language: javascriptBased.includes(type) ? 'javascript' : type,
        ...DEFAULT_OPTIONS,
      })

      return Promise.resolve(newEditor)
    }

    // Avoid create more than 3 editors (in re-renders)
    const editorsLeft = Number(localStorage.getItem('editorsLeft'))
    if (!currentEditor || editorsLeft <= 0 || containerRef.current.children.length > 0) return
    localStorage.setItem('editorsLeft', editorsLeft - 1)

    editorInstace.current = createEditor()
  }, [containerRef, memoEditor])

  return editorInstace
}
