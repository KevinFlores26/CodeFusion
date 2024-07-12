// Icons
import { useState } from 'react'
import {
  BiFileBlank,
  BiSearch,
  BiPackage,
  BiTerminal,
  BiExport,
  BiImport,
  BiHome,
  BiUserCircle,
  BiCog,
} from 'react-icons/bi'

export default function SideBar() {
  const utilsIcons = [
    { name: 'bar-file', icon: <BiFileBlank className='Sidebar-icon' /> },
    { name: 'bar-search', icon: <BiSearch className='Sidebar-icon' /> },
    { name: 'bar-package', icon: <BiPackage className='Sidebar-icon' /> },
    { name: 'bar-terminal', icon: <BiTerminal className='Sidebar-icon' /> },
    { name: 'bar-export', icon: <BiExport className='Sidebar-icon' /> },
    { name: 'bar-import', icon: <BiImport className='Sidebar-icon' /> },
  ]

  const preferencesIcons = [
    { name: 'bar-home', icon: <BiHome className='Sidebar-icon' /> },
    { name: 'bar-user', icon: <BiUserCircle className='Sidebar-icon' /> },
    { name: 'bar-settings', icon: <BiCog className='Sidebar-icon' /> },
  ]

  let itemCounter = 0
  function renderItem(array) {
    return array.map((item) => (
      <li
        key={`item-barlist-${itemCounter++}_${item.name}`}
        id={item.name}
        className={`Sidebar-item ${itemCounter === 0 ? 'Sidebar-item--active' : ''}`}
        onClick={menusHandler}
      >
        <button className='Sidebar-button'>{item.icon}</button>
      </li>
    ))
  }

  const [previousMenu, setPreviousMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState('bar-file')

  function menusHandler({currentTarget}) {
    const itemList = document.querySelectorAll('.Sidebar-item')
    const classNameActive = 'Sidebar-item--active'

    if (currentTarget.classList.contains(classNameActive)) return

    setPreviousMenu(activeMenu)
    setActiveMenu(currentTarget.id)
    
    removeClassItems(itemList, classNameActive, true)
    currentTarget.classList.add(classNameActive)
  }

  function removeClassItems(array, className, previous = false) {
    const classNamePrevious = previous ? `${className}-previous` : ''

    array.forEach((item) => {
      if (previous) {
        item.classList.contains(classNamePrevious) ? item.classList.remove(classNamePrevious) : ''
        item.classList.contains(className) ? item.classList.add(classNamePrevious) : ''
      }
      item.classList.remove(className)
    })
  }

  return (
    <aside className='Sidebar'>
      <div className='Sidebar-menus'>
        <ul className='Sidebar-list Sidebar-utils'>{renderItem(utilsIcons)}</ul>

        <ul className='Sidebar-list Sidebar-preferences'>{renderItem(preferencesIcons)}</ul>
      </div>

      <div className='Sidebar-content'></div>
    </aside>
  )
}
