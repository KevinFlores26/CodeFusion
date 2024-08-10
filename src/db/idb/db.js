import Dexie from 'dexie'

// Dexie.debug = false
export const playgroundDb = new Dexie('playground')
playgroundDb.version(1).stores({
  projects: '++id, &name, description, author, origin, created, modified, activeEditors',
  files: '++id, name, &path, ext, type, parentId, projectId, content, children',
})
