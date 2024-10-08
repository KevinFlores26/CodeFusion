import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import getCurrentDir from '@utils/getCurrentDir'
import {
  BiSolidFolder,
  BiSolidFolderOpen,
  BiFile,
  BiSolidFileJson,
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoReact,
} from 'react-icons/bi'

const icons = {
  '/': <BiSolidFolder className='ExplorerList-icon' />,
  txt: <BiFile className='ExplorerList-icon' />,
  json: <BiSolidFileJson className='ExplorerList-icon' />,
  html: <BiLogoHtml5 className='ExplorerList-icon' />,
  css: <BiLogoCss3 className='ExplorerList-icon' />,
  js: <BiLogoJavascript className='ExplorerList-icon' />,
  ts: <BiLogoTypescript className='ExplorerList-icon' />,
  jsx: <BiLogoReact className='ExplorerList-icon' />,
}

export default function ExplorerFiles({ structureObject }) {
  const [itemsArray, setItemsArray] = useState(null)
  useEffect(() => {
    function createArray(obj, index = [0]) {
      const initialKeys = Object.keys(obj)
      let currentItems = [] // Store temporary objects with their respective props then push them to resultArray
      let currentDirs = [] // Store temporary directories with their respective items (recursive cycle)
      let resultArray = [] // Store arrays with objects inside (data at index 0, files and folders)

      iterateObject(initialKeys, index)

      function iterateObject(keys, index, prevLevel = 0) {
        // Recursive function to iterate through the object
        const level = index.length - 1
        if (prevLevel > level) index.splice(level + 1)

        for (let i = 1; i < keys.length; i++) {
          const key = keys[i]
          let value = obj[key]

          if (level > 0) {
            // Get the path in levels of depth > 0
            const subIndex = [...index.slice(0, -1)]
            const dir = getCurrentDir(subIndex, obj)
            value = dir[key]
          }

          if (value === null) continue

          if (index[level] === 0) {
            // Set the initial item of each directory, it contains data about its parent directory
            const initialItem = {
              index: index.join('.'),
              name: null,
              type: null,
              level: level === 0 ? 0 : level - 1,
              value: null,
            }

            if (level === 0) {
              initialItem.name = 'root'
              initialItem.type = 'referenceRoot'
              initialItem.value = initialKeys
            } else {
              const parent = resultArray[level - 1][index.slice(0, -1).pop()]
              initialItem.name = parent.name
              initialItem.type = 'referenceDir'
              initialItem.value = parent.value
            }

            currentItems.push(initialItem)
          }

          index[level] = index[level] + 1
          const item = {
            index: index.join('.'),
            name: key,
            type: typeof value === 'object' ? 'directory' : key.split('.').pop().toString().toLowerCase(),
            level,
            value,
          }

          if (typeof value === 'object') {
            currentItems.push(item)
            currentDirs.push(value)
          } else if (typeof value === 'string') {
            currentItems.push(item)
          }

          if (i === keys.length - 1) {
            const sortedItems = [...currentItems.slice(1)].sort((a, b) => {
              // Sort directories last
              if (a.type === 'directory' && b.type !== 'directory') return 1
              if (a.type !== 'directory' && b.type === 'directory') return -1

              // Sort by name and extension
              const nameComparison = a.name.localeCompare(b.name)
              if (nameComparison !== 0) return nameComparison

              const aExt = a.name.split('.').pop()
              const bExt = b.name.split('.').pop()

              return aExt.localeCompare(bExt)
            })

            sortedItems.unshift(currentItems[0])
            for (let i = 1; i < sortedItems.length; i++) {
              // Sort items by index again
              if (level === 0) {
                sortedItems[i].index = i.toString()
              } else {
                const currentIndex = sortedItems[i].index.split('.').slice(0, -1).join('.')
                sortedItems[i].index = currentIndex.concat(`.${i}`)
              }
            }

            // When all keys are processed and all items are sorted, restart the process
            resultArray.push(sortedItems)
            currentItems = []
            const foundDirs = currentDirs
            currentDirs = []

            let iterations = foundDirs.length - 1
            for (let it = 0; it < foundDirs.length; it++) {
              const subIndex = index[level] - iterations
              const newIndex = [...index.slice(0, -1), subIndex, 0]
              const newKeys = Object.keys(foundDirs[it])

              iterations--
              iterateObject(newKeys, newIndex, level) // Recursive call for each directory
            }
          }
        }
      }

      setItemsArray(resultArray) // [[{}, {}...], [{}, {}], ...]
    }

    createArray(structureObject[0].root)
    return () => setItemsArray(null)
  }, [structureObject])

  const [renderedElements, setRenderedElements] = useState(null)
  useEffect(() => {
    function renderItems(biArray) {
      // Render the items obtained from the createArray function
      let currentSubArray = 0

      function renderDir(objectArray) {
        // Render the directories and calls recursively the renderFiles function
        const dir = objectArray[0]

        if (currentSubArray === 0) {
          // Avoid render the root directory, only its files and subdirectories
          return renderFiles(biArray[currentSubArray])
        } else {
          return (
            <li
              className='ExplorerList-item --folder'
              key={`${dir.name}-${dir.index.split('.').slice(0, -1).join('.')}`}
              data-index={dir.index.split('.').slice(0, -1).join('.')}
            >
              <div className='ExplorerList-folderWrapper'>
                {icons['/']}
                <strong className='ExplorerList-folderName'>{dir.name.replace(/\/$/, '')}</strong>
              </div>

              <ul className='ExplorerList-list' data-index={dir.index}>
                {renderFiles(biArray[currentSubArray])}
              </ul>
            </li>
          )
        }
      }

      function renderFiles(files) {
        // Render the files and calls recursively the renderDir function if there are subdirectories
        return files.map((file, i) => {
          // Avoid render the first item (data object)
          if (i === 0) return null
          if (file.type === 'directory') {
            currentSubArray++
            return renderDir(biArray[currentSubArray])
          } else {
            return (
              <li className='ExplorerList-item' key={`${file.name}---${file.index}`} data-index={file.index}>
                {icons[file.type]}
                <span>{file.name}</span>
              </li>
            )
          }
        })
      }

      setRenderedElements(
        <ul className='ExplorerContent-filesList ExplorerList' id='explorerRoot'>
          {renderDir(biArray[currentSubArray])}
        </ul>,
      )
    }

    if (itemsArray && itemsArray.length > 0) renderItems(itemsArray)

    return () => setRenderedElements(null)
  }, [itemsArray])

  return <>{renderedElements}</>
}

ExplorerFiles.propTypes = {
  structureObject: PropTypes.array.isRequired,
}
