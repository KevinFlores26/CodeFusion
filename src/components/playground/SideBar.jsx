import useSideMenusHandler from '@hooks/useSideMenusHandler'
import Search from '@components/playground/side-bar/Search'
import Explorer from '@components/playground/side-bar/Explorer'
import Packages from '@components/playground/side-bar/Packages'
import Console from '@components/playground/side-bar/Console'
import ExportMenu from '@components/playground/side-bar/ExportMenu'
import ImportMenu from '@components/playground/side-bar/ImportMenu'

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

  const { contentBar, activeMenu, menusHandler, tooltipHandler } = useSideMenusHandler({ utilsIcons })

  let itemCounter = 0
  function renderItem(array) {
    return array.map((item) => (
      <li
        key={`item-barlist-${itemCounter++}_${item.name}`}
        id={`bar-${item.name.toLowerCase()}`}
        className={`Sidebar-item ${itemCounter === 0 ? 'is-active' : ''}`}
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

    return <span>Error: not found</span>
  }

  return (
    <aside className='Sidebar'>
      <div className='Sidebar-menus'>
        <ul className='Sidebar-list Sidebar-utils'>{renderItem(utilsIcons)}</ul>
        <ul className='Sidebar-list Sidebar-preferences'>{renderItem(preferencesIcons)}</ul>
      </div>

      <div className={`Sidebar-content SideContent ${contentBar ? 'is-active' : ''}`}>{contentHandler()}</div>
    </aside>
  )
}
