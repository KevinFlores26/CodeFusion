import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useState, useEffect, useMemo } from 'react'

function createWorker() {
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
}

export default function useCreateEditor(initialEditorValues, initialOptions) {
  const [editor, setEditor] = useState(null)
  const memoEditor = useMemo(() => initialEditorValues, [initialEditorValues])
  const memoOptions = useMemo(() => initialOptions, [initialOptions])

  createWorker()

  useEffect(() => {
    if (!memoEditor.element) return

    console.log("object");
    const newEditor = monaco.editor.create(memoEditor.element, {
      value: memoEditor.value,
      language: memoEditor.language,
      ...memoOptions,
    })
    setEditor(newEditor)

    return () => {
      if (newEditor) newEditor.dispose()
      setEditor(null)
    }
  }, [memoOptions, memoEditor])

  return editor
}
