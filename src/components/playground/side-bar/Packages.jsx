import SideHeading from '@components/playground/side-bar/SideHeading'
import PackagesResult from '@components/playground/templates/PackagesResult'
import { BiLogInCircle, BiFoodMenu, BiTimeFive } from 'react-icons/bi'

export default function Packages() {
  return (
    <>
      <header className='SideContent-header'>
        <h2>Packages</h2>
        <p className='SideContent-description u-small-text'>
          <strong className='SideContent-strong'>Import npm packages into your project using its own CDNs.</strong>
          <br />
          <small className='SideContent-small'>Powered by Skypack.</small>
        </p>
      </header>

      <div className='SideContent-body PackageContent'>
        <input type='search' className='PackageContent-search u-input' placeholder='Search npm packages' />

        <section className='PackageContent-section PackageSection'>
          <SideHeading icon={<BiLogInCircle className='SideContent-headingIcon' />} title='Results' />

          <ul className='PackageSection-list'>
            <PackagesResult />
            <PackagesResult />
            <PackagesResult />
            <PackagesResult />
          </ul>
        </section>

        <section className='PackageContent-section PackageSection'>
          <SideHeading icon={<BiFoodMenu className='SideContent-headingIcon' />} title='This project' />

          <ul className='PackageSection-list'>
            <PackagesResult />
            <PackagesResult />
          </ul>
        </section>

        <section className='PackageContent-section PackageSection'>
          <SideHeading icon={<BiTimeFive className='SideContent-headingIcon' />} title='Recently used' />

          <ul className='PackageSection-list'>
            <PackagesResult />
          </ul>
        </section>
      </div>
    </>
  )
}
