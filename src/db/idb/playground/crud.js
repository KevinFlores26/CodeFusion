import { playgroundDb as db } from '../db'
import { Project, File } from './models'
import initdb, { assignEditors, validProps, getAnyBy, catchError, nameExtChainUpdate, pathChainUpdate } from './utils'
import { mimeTypes } from '@utils/objects'

// Projects CRUD
export async function createProject(name, description, author, origin = null, activeEditors = []) {
  // TODO: add author and origin ids
  /**
   * Creates a project
   * @param {string} name - name of the project
   * @param {string} description - description of the project
   * @param {string} author - name of the author
   * @param {string} origin - name of the original project
   * @param {array of objects} activeEditors - list of active editors
   * @returns {int} id of the project
   */

  try {
    const currentDate = new Date()
    origin === null ? (origin = author) : ''

    const newProject = new Project(name, description, author, origin, currentDate, currentDate, activeEditors)
    const id = await db.projects.add(newProject)

    const htmlId = await createFile('index.html', null, id)
    const cssId = await createFile('style.css', null, id)
    const jsId = await createFile('script.js', null, id)
    console.log('htmlId, cssId, jsId', htmlId, cssId, jsId)

    if (htmlId && cssId && jsId) {
      await updateProject(id, { activeEditors: await assignEditors([htmlId, cssId, jsId]) })
    }

    return id
  } catch (err) {
    console.error(catchError('Error creating project ', { name, description, author, origin, activeEditors }, err))
  }
}

export async function getProject(id) {
  /**
   * Get a file using the id of the file
   * @param {int} id - id of the file
   * @returns {object} file
   */

  try {
    const project = await db.projects.get(id)
    if (project === undefined && (await db.projects.count()) === 0) {
      const projectId = await initdb(true)
      return await db.projects.get(projectId)
    }

    return project
  } catch (err) {
    console.error(catchError('Error getting project ', id, err))
  }
}

export async function getProjectsBy(searchObj, first = false) {
  /**
   * Get project(s) by any property in the File model
   * @param {object} searchObj - object with the properties
   * @param {boolean} first - get the first item
   * @returns {object | array of objects} projects(s)
   */

  const keywords = Project.properties
  keywords.push('id')
  const valids = validProps(searchObj, keywords)

  try {
    const projects = await getAnyBy(db.projects, valids, first)
    if ((await db.projects.count()) === 0) {
      const projectId = await initdb(true)
      return await getAnyBy(db.projects, { id: projectId }, first)
    }

    return projects
  } catch (err) {
    console.error(catchError(`Error getting project(s) `, valids, err))
  }
}

export async function updateProject(id, changes) {
  /**
   * Update a project using the id of the file
   * @param {int} id - id of the project
   * @param {object} changes - object with the changes
   * @returns {void}
   */

  const availableChanges = ['name', 'description', 'modified', 'activeEditors']

  try {
    await db.projects.update(id, validProps(changes, availableChanges))
  } catch (err) {
    console.error(catchError('Error updating project ', id, err))
  }
}

export async function deleteProject(id) {
  /**
   * Delete a project using the id of the file
   * @param {int} id - id of the project
   * @returns {void}
   */

  try {
    const files = await db.files.where('projectId').equals(id).toArray()
    await db.projects.delete(id)

    if (files.length === 0) return
    for (const file of files) await deleteFile(file.id)
  } catch (err) {
    console.error(catchError('Error deleting project ', id, err))
  }
}

// Files CRUD
export async function createFile(name, parentId, projectId, isDir = false, content = '') {
  /**
   * Creates a file
   * @param {string} name - name of the file
   * @param {string} type - type or extension of the file
   * @param {int} parentId - id of the parent directory
   * @param {int} projectId - id of the project where it is "stored"
   * @param {string} content - initial content of the file
   * @param {boolean} isDir - if the file is a directory
   * @returns {int} id of the created file
   */

  const dirType = 'directory'

  const ext = isDir ? null : name.split('.').pop()
  const type = isDir ? dirType : mimeTypes[ext]
  const contentFile = isDir ? null : content
  const childrenDir = isDir ? [] : null

  try {
    const parent = typeof parentId === 'number' ? await getFile(parentId) : null
    const path = parentId === null ? `/${name}` : `${parent?.path}/${name}`

    const newFile = new File(name, path, ext, type, parentId, projectId, contentFile, childrenDir)
    const id = await db.files.add(newFile)

    if (parentId !== null && parent) {
      const updatedChildren = [...parent.children, id]
      await db.files.update(parentId, { children: updatedChildren })
    }

    return id
  } catch (err) {
    console.error(catchError('Error creating file ', { name, parentId, projectId, isDir, content }, err))
  }
}

export async function getFile(id) {
  /**
   * Get a file using the id of the file
   * @param {int} id - id of the file
   * @returns {object | undefined} file or undefined if file was not found or projects is empty
   */

  try {
    const file = await db.files.get(id)
    if (file === undefined && (await db.projects.count()) === 0) {
      await initdb(true)
      return undefined
    }

    return file
  } catch (err) {
    console.error(catchError('Error getting file ', id, err))
  }
}

export async function getFilesBy(searchObj, first = false) {
  /**
   * Get files by any property in the File model
   * @param {object} searchObj - object with the properties
   * @param {boolean} first - get the first item
   * @returns {object | array of objects | undefined} file(s) or undefined if file was not found or projects is empty
   */

  const keywords = File.properties
  keywords.push('id')
  const valids = validProps(searchObj, keywords)

  try {
    const files = await getAnyBy(db.files, valids, first)
    if ((await db.projects.count()) === 0) {
      await initdb(true)
      return undefined
    }

    return files
  } catch (err) {
    console.error(catchError(`Error getting file(s) `, valids, err))
  }
}

export async function updateFile(id, changes) {
  /**
   * Update a file using the id of the file
   * @param {int} id - id of the file
   * @param {object} changes - object with the changes
   * @returns {void}
   */

  const availableChanges = ['name', 'path', 'ext', 'content']
  const valids = validProps(changes, availableChanges)
  const validedProps = Object.keys(valids)
  let incomingChanges = valids

  try {
    const file = await db.files.get(id)

    if (validedProps.length > 0) {
      for (const prop of validedProps) {
        const value = valids[prop]

        if (prop === 'name' || prop === 'ext') {
          const isTypeDir = file.type === 'directory' ? true : false
          incomingChanges = nameExtChainUpdate(prop, value, file, isTypeDir)
        } else if (prop === 'path') {
          const parent = await db.files.get(file.parentId)
          incomingChanges = await pathChainUpdate(value, file, parent)
        } else if (prop === 'content') {
          incomingChanges = { content: value }
        }
      }
    }

    await db.files.update(id, incomingChanges)
  } catch (err) {
    console.error(catchError('Error updating file ', id, err))
  }
}

export async function deleteFile(id) {
  /**
   * Delete a file using the id of the file
   * @param {int} id - id of the file
   * @returns {void}
   */

  try {
    const file = await db.files.get(id)

    if (file.type === 'directory') {
      for (const childId of file.children) await deleteFile(childId)
    }

    const parentId = file.parentId
    await db.files.delete(id)

    if (parentId === null) return

    const parent = await db.files.get(parentId)
    parent.children = parent.children.filter((childId) => childId !== id)
    await db.files.update(parentId, { children: parent.children })
  } catch (err) {
    console.error(catchError('Error deleting file ', id, err))
  }
}
