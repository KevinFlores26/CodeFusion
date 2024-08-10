export default function getCurrentDir(index, obj) {
  const itemPath = index.reduce((acc, i, it) => {
    if (it === 0) {
      const initialPath = Object.keys(obj)[i].toString()
      acc.push([initialPath])
    } else {
      const currentPath = acc.reduce((subAcc, key) => subAcc[key], obj)
      const newKeys = Object.keys(currentPath)
      const path = newKeys[i].toString()
      acc.push([path])
    }

    return acc
  }, [])

  const dir = itemPath.reduce((acc, path) => acc[path], obj)
  return dir
}
