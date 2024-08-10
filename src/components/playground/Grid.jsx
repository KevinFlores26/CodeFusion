import Split from 'react-split-grid'
import { MemoEditor } from './Editor'
import { MemoOutput } from './Output'
import { useState, useEffect, useRef, useCallback } from 'react'

let gridData = JSON.parse(localStorage.getItem('gridTemplateData'))
if (!gridData || gridData?.length === 0) {
  const initialData = {
    cols: null,
    rows: null,
  }

  localStorage.setItem('gridTemplateData', JSON.stringify(initialData))
}
gridData = JSON.parse(localStorage.getItem('gridTemplateData'))

export default function Grid() {
  const initialCols = useRef(gridData?.cols || null)
  const initialRows = useRef(gridData?.rows || null)
  const grid = useRef(null)
  const [mounted, setMounted] = useState(false)

  const handleDragEnd = useCallback(() => {
    if (!grid.current) return
    const style = grid.current.getAttribute('style')
    const sections = style.split(';').slice(0, -1)

    const cols = sections.filter((prop) => prop.includes('grid-template-columns:')).pop()
    const rows = sections.filter((prop) => prop.includes('grid-template-rows:')).pop()
    const colsValue = cols.replace('grid-template-columns:', '').trim()
    const rowsValue = rows.replace('grid-template-rows:', '').trim()

    localStorage.setItem('gridTemplateData', JSON.stringify({ cols: colsValue, rows: rowsValue }))
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Split
      gridTemplateColumns={mounted ? undefined : initialCols.current}
      gridTemplateRows={mounted ? undefined : initialRows.current}
      onDragEnd={() => handleDragEnd()}
      render={({ getGridProps, getGutterProps }) => (
        <div className='Root-grid u-grid' ref={grid} {...getGridProps()}>
          <MemoEditor editorId={0} />
          <div className='gutter-col gutter-col-1' {...getGutterProps('column', 1)} />
          <MemoEditor editorId={1} />
          <MemoEditor editorId={2} />
          <div className='gutter-row gutter-row-1' {...getGutterProps('row', 1)} />
          <MemoOutput />
        </div>
      )}
    />
  )
}
