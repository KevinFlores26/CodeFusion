import Split from 'react-split'
import ExplorerFiles from '@components/playground/templates/ExplorerFiles'
import filesSample from '@components/playground/templates/filesSample'
import SideHeading from '@components/playground/side-bar/SideHeading'
import Button from '@components/Button'
import { BiRightArrow } from 'react-icons/bi'

export default function Explorer() {
 

  return (
    <>
      <div className='SideContent-header'>
        <h2>Explorer</h2>
        <h3 className='u-heading5'>Project name</h3>
      </div>

      <div className='SideContent-body ExplorerContent'>
        <Split
          className='split'
          direction="vertical"
        >
          <ExplorerFiles icon={<BiRightArrow className='SideContent-headingIcon' />} fileName='file name' structureObject={filesSample()} />

          <div>
            <SideHeading icon={<BiRightArrow className='SideContent-headingIcon' />} title='Recent files' />

            <ul>
              <li>
                <i>{/* temp: icon file */}</i>
                <span>file name</span>
              </li>
            </ul>
          </div>
        </Split>

        <Button className='u-flexCol --xlSize --success' icon={<BiRightArrow className='u-button-icon' />} title='Run preview' />
      </div>
    </>
  )
}
