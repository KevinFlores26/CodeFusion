import { Routes, Route, Navigate } from 'react-router-dom'
import Index from '@src/pages/Index'
import Playground from '@src/pages/Playground'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/playground' element={<Playground />} />
      <Route path='*' element={<Navigate to='/' replace />} />
      {/* TODO: Add 404 and then redirect to '/' */}
    </Routes>
  )
}
