import { useRef, useMemo, useState } from 'react'

export default function useRenderMenus({ utilsIcons }) {
  const tooltipTimer = useRef(null)
  const tooltipHandler = useMemo(
    () => ({
      show: ({ currentTarget: item }) => {
        tooltipTimer.current = setTimeout(() => {
          if (!item.matches(':hover')) return
          item.classList.add('is-tooltipActive')
        }, 300)
      },
      hide: ({ currentTarget: item }) => {
        item.classList.remove('is-tooltipActive')
        tooltipTimer.current ? clearTimeout(tooltipTimer.current) : ''
      },
    }),
    [],
  )

  const [previousMenu, setPreviousMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState(`bar-${utilsIcons[0].name.toLowerCase()}`)
  const [contentBar, setContentBar] = useState(true)

  function menusHandler({ currentTarget }) {
    if (currentTarget.getAttribute('id') === activeMenu) {
      contentBar ? setContentBar(false) : setContentBar(true)
      return
    }

    const itemList = document.querySelectorAll('.Sidebar-item')
    const classNameActive = 'is-active'

    setPreviousMenu(activeMenu)
    setActiveMenu(currentTarget.id)

    removeClassItems(itemList, classNameActive, true)
    currentTarget.classList.add(classNameActive)
  }

  return {
    contentBar,
    previousMenu,
    activeMenu,
    tooltipHandler,
    menusHandler,
  }
}

function removeClassItems(array, className, previous = false) {
  const classNamePrevious = previous ? `${className}Previous` : ''

  array.forEach((item) => {
    if (previous) {
      item.classList.contains(classNamePrevious) ? item.classList.remove(classNamePrevious) : ''
      item.classList.contains(className) ? item.classList.add(classNamePrevious) : ''
    }
    item.classList.remove(className)
  })
}
