import { playgroundDb as db } from '../db'
import { getFile, createProject } from './crud'
import { mimeTypes } from '@utils/objects'

// Initialize
export default async function initdb(projectSearchDone = false) {
  /**
   * Initializes the database
   * @param {boolean} projectSearchDone - if the project search was done
   * @returns {int} id of the project
   */

  try {
    localStorage.setItem('projectName', 'Project')
    if (projectSearchDone) return await createProject('Project', 'Project description', 'user')
    if ((await db.projects.count()) === 0) {
      return await createProject('Project', 'My project description', 'user')
    }
  } catch (err) {
    console.error('error initializing db: ', err)
  }
}

// Helpers
export async function assignEditors(fileIds) {
  /**
   * Assigns the files data for each editor
   * @param {array of int} fileIds - array with the ids of the files
   * @returns {array of objects} editors
   */

  let editors = []

  try {
    for (const id of fileIds) {
      const file = await getFile(id)

      const editorData = {
        id: file.id,
        path: file.path,
        name: file.name,
        type: file.type,
        parentId: file.parentId,
        projectId: file.projectId,
      }

      editors.push(editorData)
    }
  } catch (err) {
    console.error('error assigning editors: ', err)
  }

  return editors
}

export function validProps(props, availableProps) {
  /**
   * Helper function to validate properties
   * @param {object} props - object with the properties
   * @param {array} availableProps - array with the available properties
   */

  let valids = {}

  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      const property = availableProps.includes(key) ? key : null
      const value = props[key]

      if (property === null) continue
      valids = { ...valids, [property]: value }
    }
  }

  if (valids.length === 0) throw new Error('invalid changes: ', props)
  return valids
}

export function nameExtChainUpdate(prop, value, file, isDir = false) {
  /**
   * Helper function to update the name, ext and path
   * @param {string} prop - name or extension
   * @param {string} value - new value
   * @param {object} file - file object
   * @param {boolean} isDir - if the file is a directory
   * @returns {object} updated object
   */

  if (isDir) {
    const path = file.path.split('/').slice(0, -1).join('/')
    const newPath = path + '/' + value

    return { name: value, ext: null, type: 'directory', path: newPath }
  }

  const newName = prop === 'name' ? value : file.name.split('.')[0].concat('.' + value)
  const newExt = prop === 'ext' ? value : file.name.split('.').pop()
  const newType = mimeTypes[newExt]
  const path = file.path.split('/').slice(0, -1).join('/')
  const newPath = path + '/' + newName

  return { name: newName, ext: newExt, type: newType, path: newPath }
}

export async function pathChainUpdate(reqPath, file, parent) {
  /**
   * Helper function to update the path and its parent directories
   * @param {string} reqPath - new path
   * @param {object} file - file object
   * @param {object} parent - parent object
   * @returns {object} updated object
   */

  let newPath = reqPath
  if (newPath.split('.').length > 0) {
    const path = newPath.split('/').slice(0, -1).join('/')
    newPath = path + '/' + file.name
  }
  
  const updatedChildren = parent.children.filter((childId) => childId !== file.id)
  await db.file.update(parent.id, { children: updatedChildren })
  const newParent = await db.file.where('path').equals(newPath.split('/').slice(0, -1).join('/')).first()
  await db.file.update(newParent.id, { children: [...newParent.children, file.id] })

  return { path: newPath, parentId: newParent?.id }
}

export async function getAnyBy(objectStore, valids, first) {
  /**
   * Helper function to get items from any objectStore
   * @param {objectStore} objectStore - objectStore
   * @param {object} valids - object with the properties already validated
   * @param {boolean} first - get the first item
   */

  const validKeys = Object.keys(valids)

  try {
    if (validKeys.length === 1) {
      const keyword = [...validKeys].pop()
      const value = [...Object.values(valids)].pop()

      if (first) return await objectStore.where(keyword).equals(value).first()
      return await objectStore.where(keyword).equals(value).toArray()
    } else {
      if (first) return await objectStore.where(valids).first()
      return await objectStore.where(valids).toArray()
    }
  } catch (err) {
    console.error(catchError(`Error getting items in 'getAnyBy function' `, valids, err))
  }
}

export function catchError(bodyMsg, params, err, prop = 'id') {
  /**
   * Write the error message
   * @param {string} bodyMsg - body message
   * @param {object | array | string | number} params - given parameters
   * @param {string} err - error message
   * @param {string} prop - property of the objectStore (only if params is not an object)
   */

  if (typeof params === 'object' && !Array.isArray(params)) {
    const keys = Object.keys(params)
    params = keys.map((key) => `"${key}: ${params[key]}"`)
  }
  const isArray = Array.isArray(params)
  const paramMsg = isArray
    ? `with the following parameters: ${params.map((param) => `${param} `)}`
    : `by ${prop}: ${params}.`

  return `${bodyMsg} ${paramMsg}${err ? `\nDetails of the error: ${err}` : ''}`
}
