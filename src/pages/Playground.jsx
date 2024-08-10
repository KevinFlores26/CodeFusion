import SideBar from '@components/playground/SideBar'
import Grid from '@components/playground/Grid'
import '@styles/layouts/playground.css'

export default function Playground() {
  return (
    <main className='Root-main'>
      <Grid />
      <SideBar />
    </main>
  )
}
