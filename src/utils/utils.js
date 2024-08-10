export function getItemDate(date, string = false) {
  /**
   * Get a formatted date
   * @param {boolean} string - if true, returns a string
   * @returns {array | string} date
   */

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (string) {
    const stringDate = String(`${year}/${month}/${day} - ${hour}:${minute}:${second}`)
    return stringDate
  }

  return [
    [year, month, day],
    [hour, minute, second],
  ]
}

export function resolvePath(relativePath) {
  const pathParts = ['']
  const relativeParts = relativePath.split('/')

  relativeParts.forEach((part) => {
    if (part === '.') {
      return
    } else if (part === '..') {
      pathParts.pop()
    } else {
      pathParts.push(part)
    }
  })

  const resolvedPath = pathParts.join('/')
  console.log('resolvedPath', resolvedPath)

  return resolvedPath
}
