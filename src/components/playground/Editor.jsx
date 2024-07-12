import { useState, useEffect, useRef, useMemo } from 'react'
import useCreateEditor from '@hooks/useCreateEditor'
import Split from 'react-split-grid'

export default function Editor() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [output, setOutput] = useState('')

  const htmlRef = useRef(null)
  const cssRef = useRef(null)
  const jsRef = useRef(null)

  const DEFAULT_OPTIONS = useMemo(() => ({
    automaticLayout: true,
    theme: 'vs-dark',
  }), [])

  const htmlEditorProps = useMemo(() => ({
    element: htmlRef.current,
    value: '',
    language: 'html',
  }), [htmlRef.current])

  const cssEditorProps = useMemo(() => ({
    element: cssRef.current,
    value: '',
    language: 'css',
  }), [cssRef.current])

  const jsEditorProps = useMemo(() => ({
    element: jsRef.current,
    value: '',
    language: 'javascript',
  }), [jsRef.current])

  let htmlEditor = useCreateEditor(htmlEditorProps, DEFAULT_OPTIONS)
  let cssEditor = useCreateEditor(cssEditorProps, DEFAULT_OPTIONS)
  let jsEditor = useCreateEditor(jsEditorProps, DEFAULT_OPTIONS)

  useEffect(() => {
    if (!(htmlEditor && cssEditor && jsEditor)) return

    htmlEditor.onDidChangeModelContent(() => setHtml(htmlEditor.getValue()))
    cssEditor.onDidChangeModelContent(() => setCss(cssEditor.getValue()))
    jsEditor.onDidChangeModelContent(() => setJs(jsEditor.getValue()))
  }, [htmlEditor, cssEditor, jsEditor])

  useEffect(() => {
    const createDocument = () => `
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
    
    setOutput(createDocument())
  }, [html, css, js])

  return (
    <Split
      render={({ getGridProps, getGutterProps }) => (
        <div className='Root-grid u-grid' {...getGridProps()}>
          <div className='Root-editor'>
            <div ref={htmlRef} id='html'></div>
          </div>
          <div
            className='gutter-col gutter-col-1'
            {...getGutterProps('column', 1)}
          />
          <div className='Root-editor'>
            <div ref={cssRef} id='css'></div>
          </div>
          <div className='Root-editor'>
            <div ref={jsRef} id='javascript'></div>
          </div>
          <div
            className='gutter-row gutter-row-1'
            {...getGutterProps('row', 1)}
          />
          <iframe className='Root-output' srcDoc={output}></iframe>
        </div>
      )}
    />
  )
}
