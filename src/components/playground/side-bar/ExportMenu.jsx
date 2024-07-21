import SideHeading from '@components/playground/side-bar/SideHeading'
import Button from '@components/Button'
import {
  BiClipboard,
  BiCloudUpload,
  BiCodeCurly,
  BiCopy,
  BiDownload,
  BiExport,
  BiShareAlt,
  BiSolidFileArchive,
} from 'react-icons/bi'

export default function ExportMenu() {
  return (
    <>
      <div className='SideContent-header'>
        <h2>Export</h2>
        <p className='u-small-text'>
          <strong className='SideContent-strong'>Export, share or download your project.</strong>
        </p>
      </div>

      <div className='SideContent-body ExportContent'>
        <section className='ExportContent-section'>
          <SideHeading icon={<BiExport className='SideContent-headingIcon' />} title='Export' />

          <div className='ExportContent-btnContainer'>
            <Button className='u-flexCol --xlSize --primary' icon={<BiCloudUpload className='u-button-icon' />} title='Upload' />
            <Button className='u-flexCol --xlSize --primaryAlt' icon={<BiCopy className='u-button-icon' />} title='Copy To' />
          </div>
        </section>

        <section className='ExportContent-section'>
          <SideHeading icon={<BiShareAlt className='SideContent-headingIcon' />} title='Share' />

          <div className='ExportContent-btnContainer'>
            <Button className='u-flexCol --xlSize --primaryAlt' icon={<BiClipboard className='u-button-icon' />} title='Clipboard' />
            <Button className='u-flexCol --xlSize --primaryAlt' icon={<BiCodeCurly className='u-button-icon' />} title='Download JSON' />
          </div>
        </section>

        <section className='ExportContent-section'>
          <SideHeading icon={<BiDownload className='SideContent-headingIcon' />} title='Local' />

          <Button className='u-flexCol --xlSize --primaryAlt' icon={<BiSolidFileArchive className='u-button-icon' />} title='Download Zip' />
        </section>
      </div>
    </>
  )
}
