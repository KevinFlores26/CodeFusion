import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { updateFile } from '@db/idb/playground/crud'
import useBuildStore from '@store/useBuildStore'
import useEditorStore from '@store/useEditorStore'
import useCreateEditor from '@hooks/playground/useCreateEditor'
import debounce from 'lodash.debounce'

export default function Editor({ editorId }) {
  const containerRef = useRef(null)
  const editorData = useEditorStore((state) => state.editors[editorId])
  const setBuilds = useBuildStore((state) => state.setBuilds)
  const editorInstance = useCreateEditor(containerRef, editorId)

  useEffect(() => {
    async function updateEditor() {
      try {
        const editor = await editorInstance.current
        if (!editor) return

        editor.onDidChangeModelContent(() => onChangeHandler(editorData.id, editor.getValue()))
      } catch (err) {
        console.error('error initializing editor: ', err)
      }

      const debouncedFile = debounce(async (id, changes) => {
        await updateFile(id, changes)
        setBuilds(id)
      }, 500)

      async function onChangeHandler(fileId, value) {
        await debouncedFile(fileId, { content: value })
      }
    }

    updateEditor()
  }, [editorInstance, editorData.id, setBuilds])

  return (
    <div
      className='Root-editor'
      data-editor-id={editorId}
      data-extension={editorData?.ext || null}
      data-file-id={editorData?.id || null}
      data-filename={editorData?.name || null}
      data-filepath={editorData?.path || null}
    >
      <div ref={containerRef}>{/* Monaco editor instance here */}</div>
    </div>
  )
}

Editor.propTypes = {
  editorId: PropTypes.number.isRequired,
}

export const MemoEditor = React.memo(Editor)
