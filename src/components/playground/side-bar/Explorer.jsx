import ExplorerFiles from '@components/playground/templates/ExplorerFiles'
import filesSample from '@components/playground/templates/filesSample'
import SideHeading from '@components/playground/side-bar/SideHeading'
import Button from '@components/Button'
import { BiRightArrow, BiTimeFive } from 'react-icons/bi'

export default function Explorer() {
  return (
    <>
      <div className='SideContent-header'>
        <h2>Explorer</h2>
        <h3 className='u-heading5'>Project name</h3>
      </div>

      <div className='SideContent-body ExplorerContent'>
        <section className='ExplorerContent-files'>
          <ExplorerFiles structureObject={filesSample()} />
  
          <div className='ExplorerContent-recent ExplorerRecent'>
            <SideHeading icon={<BiTimeFive className='SideContent-headingIcon' />} title='Recent files' />
  
            <ul className='ExplorerRecent-list'>
              <li>
                <i>{/* temp: icon file */}</i>
                <span>No recent files</span>
              </li>
            </ul>
          </div>
        </section>

        <Button
          className='u-flexCol --xlSize --success'
          icon={<BiRightArrow className='u-button-icon' />}
          title='Run preview'
        />
      </div>
    </>
  )
}
