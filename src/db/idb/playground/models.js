import { playgroundDb as db } from '../db'

export class Project {
  constructor(name, description, author, origin, created, modified, activeEditors = []) {
    this.name = name
    this.description = description
    this.author = author
    this.origin = origin
    this.created = created
    this.modified = modified
    this.activeEditors = activeEditors
  }

  static get properties() {
    return Object.keys(new Project())
  }
}

export class File {
  constructor(name, path, ext, type, parentId, projectId, content = '', children = []) {
    this.name = name
    this.path = path
    this.ext = ext
    this.type = type
    this.parentId = parentId
    this.projectId = projectId
    this.content = content
    this.children = children
  }

  static get properties() {
    return Object.keys(new File())
  }
}

db.projects.mapToClass(Project)
db.files.mapToClass(File)
