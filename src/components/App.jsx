import { Routes, Route, Navigate } from 'react-router-dom'
import Index from '@src/pages/Index'
import Editor from '@src/pages/Editor'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/playground' element={<Editor />} />
      <Route path='*' element={<Navigate to='/' replace />} />
      {/* TODO: Add 404 and then redirect to '/' */}
    </Routes>
  )
}

export default App
