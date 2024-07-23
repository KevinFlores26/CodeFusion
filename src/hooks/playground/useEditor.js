import { useMemo } from 'react'
import useCreateEditor from '@hooks/playground/useCreateEditor'

const DEFAULT_OPTIONS = {
  automaticLayout: true,
  theme: 'vs-dark',
}

/* eslint-disable react-hooks/exhaustive-deps */
export default function useEditor({ htmlRef, cssRef, jsRef }) {
  const htmlEditorProps = useMemo(
    () => ({
      element: htmlRef.current,
      value: '',
      language: 'html',
    }),
    [htmlRef.current],
  )

  const cssEditorProps = useMemo(
    () => ({
      element: cssRef.current,
      value: '',
      language: 'css',
    }),
    [cssRef.current],
  )

  const jsEditorProps = useMemo(
    () => ({
      element: jsRef.current,
      value: '',
      language: 'javascript',
    }),
    [jsRef.current],
  )

  let htmlEditor = useCreateEditor(htmlEditorProps, DEFAULT_OPTIONS)
  let cssEditor = useCreateEditor(cssEditorProps, DEFAULT_OPTIONS)
  let jsEditor = useCreateEditor(jsEditorProps, DEFAULT_OPTIONS)

  const createDocument = (html, css, js) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        ${css}
      </style>
      <script type="module">
        ${js}
      </script>
    </head>
    <body>
      ${html}
    </body>
  </html>
  `

  return [htmlEditor, cssEditor, jsEditor, createDocument]
}
