import React, { useEffect, useRef } from 'react'
import { getProjectsBy, getFilesBy } from '@db/idb/playground/crud'
import useBuildStore from '@store/useBuildStore'
import useEditorStore from '@store/useEditorStore'
import useOutputStore from '@store/useOutputStore'
import { useLiveQuery } from 'dexie-react-hooks'
import { regex } from '@utils/objects'

const projectName = localStorage.getItem('projectName')
let viewChanged = false

export default function Output() {
  const builds = useBuildStore((state) => state.builds)
  const iframe = useRef(null)

  const editors = useEditorStore((state) => state.editors)
  const { doc, setDoc, currentView, setCurrentView } = useOutputStore((state) => {
    return {
      doc: state.doc,
      setDoc: state.setDoc,
      currentView: state.currentView,
      setCurrentView: state.setCurrentView,
    }
  })

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'local-navigation') {
        setCurrentView(event.data.path)
        viewChanged = true
      }
    })
  }, [setCurrentView])

  useEffect(() => {
    const htmlEditor = editors.find((editor) => editor.ext === 'html')
    setCurrentView(htmlEditor?.path || '/index.html')
  }, [editors, setCurrentView])

  const getView = useLiveQuery(async () => {
    try {
      const currentProject = await getProjectsBy({ name: projectName }, true)
      const file = await getFilesBy({ projectId: currentProject.id, path: currentView }, true)

      return file ? file : null
    } catch (err) {
      console.error('error getting index file: ', err)
      return null
    }
  }, [currentView])

  useEffect(() => {
    console.log('builds', builds)
    async function loadView() {
      const listenToUrlChanges = `
        <script>
          window.addEventListener('load', () => {
            const links = document.querySelectorAll('[href]')

            links.forEach((link) => {
              link.addEventListener('click', (e) => {
                e.preventDefault()

                const url = new URL(e.target.href)
                const locationOrigin = window.location.ancestorOrigins[0]

                if (url.origin === locationOrigin && url.pathname.startsWith('/')) {
                  window.parent.postMessage({ type: 'local-navigation', path: url.pathname }, '*')
                  return
                }
                window.location.href = e.target.href
              })
            })
          })
        </script>\n`

      let view = await getView
      if (!view) {
        if (!viewChanged) {
          setCurrentView('/index.html')
          return
        }

        const fileNotFound = `
          <html>
            <head>
              <title>Error 404: File Not Found</title>
              <style>
                body { display: flex; flex-direction: column; justify-content: center; align-items: center; }
                h1 { font-size: 3rem; font-weight: 800; }
              </style>
              ${listenToUrlChanges}
            </head>
            <body>
              <h1>Error 404: View (${currentView}) Not Found</h1>
              <a href="/index.html">Go to index</a>
            </body>
          </html>\n`

        setDoc(fileNotFound)
        return
      }
      const bundledFiles = builds.find((build) => build.referenceData.htmlPath === currentView)?.outputFiles
      if (bundledFiles.length === 0) {
        setDoc(view.content)
        return
      }

      const purgedDoc = view.content
        .replace(regex.notExtLStyle, '')
        .replace(regex.notExtScript, '')
        .replace(regex.clsHtml, '')
      const htmlParts = {
        opHtml: purgedDoc.match(regex.opHtml),
        head: purgedDoc.match(regex.head),
        body: purgedDoc.match(regex.body),
      }

      const scripts = bundledFiles.filter((file) => file.path.endsWith('.js'))
      const lStyles = bundledFiles.filter((file) => file.path.endsWith('.css'))
      let finalDoc = ''

      if (htmlParts.head?.length > 0 && htmlParts.body?.length > 0) {
        const unclosedHead = htmlParts.head[0].replace('</head>', '')
        const finalHead = unclosedHead.concat(addHeadContent())

        if (htmlParts.opHtml?.length > 0) {
          finalDoc = htmlParts.opHtml[0].concat(finalHead, htmlParts.body, '\n</html>')
        } else {
          finalDoc = '<html>\n'.concat(finalHead, htmlParts.body, '\n</html>')
        }
      } else {
        if (htmlParts.opHtml?.length > 0) {
          const contentDoc = '<head>\n'.concat(addHeadContent(), '<body>\n', purgedDoc, '\n</body>\n')
          finalDoc = htmlParts.opHtml[0].concat(contentDoc, '</html>')
        } else {
          finalDoc = '<html>\n'.concat('<head>\n', addHeadContent(), purgedDoc, '\n</html>')
        }
      }
      setDoc(finalDoc)

      function addHeadContent() {
        const pathSplit = 'temp-out-esbuild'
        return [
          '\n',
          lStyles
            .map((style) => {
              const hash = `data-bundling-hash="${style.hash}"`
              const path = `data-bundling-path="${style.path.split(pathSplit).pop().replace('\\', '/')}"`

              return `<style ${hash} ${path}>${style.text}</style>\n`
            })
            .join(''),
          listenToUrlChanges,
          scripts
            .map((script) => {
              const hash = `data-bundling-hash="${script.hash}"`
              const path = `data-bundling-path="${script.path.split(pathSplit).pop().replace('\\', '/')}"`

              return `<script type="module" ${hash} ${path}>${script.text}</script>\n`
            })
            .join(''),
          '</head>\n',
        ].join('')
      }
    }

    loadView()
  }, [builds, getView, setCurrentView, currentView, setDoc])

  return <iframe ref={iframe} className='Root-output' srcDoc={doc}></iframe>
}

export const MemoOutput = React.memo(Output)
