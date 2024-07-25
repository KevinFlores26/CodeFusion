import useSideMenusHandler from '@hooks/playground/useSideMenusHandler'
import Search from './side-bar/Search'
import Explorer from './side-bar/Explorer'
import Packages from './side-bar/Packages'
import Console from './side-bar/Console'
import ExportMenu from './side-bar/ExportMenu'
import ImportMenu from './side-bar/ImportMenu'

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

const utilsIcons = [
  { name: 'Explorer', icon: <BiFileBlank className='Sidebar-icon' /> },
  { name: 'Search', icon: <BiSearch className='Sidebar-icon' /> },
  { name: 'Packages', icon: <BiPackage className='Sidebar-icon' /> },
  { name: 'Console', icon: <BiTerminal className='Sidebar-icon' /> },
  { name: 'Export', icon: <BiExport className='Sidebar-icon' /> },
  { name: 'Import', icon: <BiImport className='Sidebar-icon' /> },
]

const preferencesIcons = [
  { name: 'Home', icon: <BiHome className='Sidebar-icon' /> },
  { name: 'User', icon: <BiUserCircle className='Sidebar-icon' /> },
  { name: 'Settings', icon: <BiCog className='Sidebar-icon' /> },
]

export default function SideBar() {
  const { contentBar, activeMenu, menusHandler, tooltipHandler } = useSideMenusHandler({ utilsIcons })

  function renderItem(array) {
    return array.map((item, i) => (
      <li
        key={`item-barlist-${i}_${item.name}`}
        id={`bar-${item.name.toLowerCase()}`}
        className={`Sidebar-item ${i === 0 ? 'is-active' : ''}`}
        onClick={menusHandler}
        onMouseEnter={tooltipHandler.show}
        onMouseLeave={tooltipHandler.hide}
      >
        <button className='Sidebar-button' data-tooltip={item.name}>
          {item.icon}
        </button>
      </li>
    ))
  }

  function contentHandler() {
    if (activeMenu === `bar-${utilsIcons[0].name.toLowerCase()}`) return <Explorer />
    if (activeMenu === `bar-${utilsIcons[1].name.toLowerCase()}`) return <Search />
    if (activeMenu === `bar-${utilsIcons[2].name.toLowerCase()}`) return <Packages />
    if (activeMenu === `bar-${utilsIcons[3].name.toLowerCase()}`) return <Console />
    if (activeMenu === `bar-${utilsIcons[4].name.toLowerCase()}`) return <ExportMenu />
    if (activeMenu === `bar-${utilsIcons[5].name.toLowerCase()}`) return <ImportMenu />

    return <span className='SideContent-error'>Error: not found</span>
  }

  return (
    <aside className='Sidebar'>
      <div className='Sidebar-menus'>
        <ul className='Sidebar-list Sidebar-utils'>{renderItem(utilsIcons)}</ul>
        <ul className='Sidebar-list Sidebar-preferences'>{renderItem(preferencesIcons)}</ul>
      </div>

      <div className={`Sidebar-content SideContent ${contentBar ? 'is-active' : ''}`}>
        <div
          className={`SideContent-content --${activeMenu.split('-').pop()}`}
          data-current-menu={activeMenu.split('-').pop()}
        >
          {contentHandler()}
        </div>
      </div>
    </aside>
  )
}
