import { useState, useEffect, useRef } from 'react'
import useEditor from '@hooks/playground/useEditor'
import Split from 'react-split-grid'

export default function Editor() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [output, setOutput] = useState('')

  const htmlRef = useRef(null)
  const cssRef = useRef(null)
  const jsRef = useRef(null)

  const [ htmlEditor, cssEditor, jsEditor, createDocument ] = useEditor({ htmlRef, cssRef, jsRef })

  useEffect(() => {
    if (!(htmlEditor && cssEditor && jsEditor)) return

    htmlEditor.onDidChangeModelContent(() => setHtml(htmlEditor.getValue()))
    cssEditor.onDidChangeModelContent(() => setCss(cssEditor.getValue()))
    jsEditor.onDidChangeModelContent(() => setJs(jsEditor.getValue()))
  }, [htmlEditor, cssEditor, jsEditor])

  useEffect(() => {
    setOutput(createDocument(html, css, js))
  }, [html, css, js, createDocument])

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
