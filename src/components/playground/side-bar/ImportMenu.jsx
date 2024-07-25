import SideHeading from './SideHeading'
import Button from '@components/Button'
import { BiArrowToTop, BiClipboard, BiFile, BiSearchAlt, BiWindowOpen } from 'react-icons/bi'

export default function ImportMenu() {
  return (
    <>
      <div className='SideContent-header'>
        <h2>Import</h2>
        <p className='SideContent-description u-small-text'>
          <strong className='SideContent-strong'>Import other projects, folders or files into this project.</strong>
          <br />
          <small className='SideContent-small'>
            Only web files are supported.{' '}
            <a href='#' className='SideContent-link'>
              Check the full list.
            </a>
          </small>
        </p>
      </div>

      <div className='SideContent-body ImportContent'>
        <section className='ImportContent-section'>
          <SideHeading icon={<BiSearchAlt className='SideContent-headingIcon' />} title='Search project' />

          <Button
            className='btn-primary u-flexCol --xlSize --primary'
            icon={<BiWindowOpen className='u-button-icon' />}
            title='Open Search'
          />
        </section>

        <section className='ImportContent-section'>
          <SideHeading icon={<BiClipboard className='SideContent-headingIcon' />} title='From clipboard/URL' />

          <textarea
            id='clipboard-import'
            className='ImportContent-textarea u-textarea'
            rows={2}
            placeholder='Copied text from export section or valid URL'
          ></textarea>
        </section>

        <section className='ImportContent-section'>
          <SideHeading icon={<BiFile className='SideContent-headingIcon' />} title='From local' />

          <div className='ImportContent-importLocal'>
            <input type='file' className='u-hidden' />
            <Button
              className='btn-primary u-flexCol --xlSize --primary'
              icon={<BiWindowOpen className='u-button-icon' />}
              title='Choose File'
            />

            <div className='ImportContent-dragDrop'>
              <BiArrowToTop className='ImportContent-dragDropIcon' />

              <div className='ImportContent-dragDropText'>
                <span>Drag and drop files here</span>
                <small className='SideContent-small'>Selected files will appear</small>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
