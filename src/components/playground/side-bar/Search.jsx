import SideHeading from '@components/playground/side-bar/SideHeading.jsx'
import SearchList from '@components/playground/templates/SearchList'
import {
  BiLogInCircle,
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoReact,
  BiSolidFileJson,
} from 'react-icons/bi'

export default function Search() {
  return (
    <>
      <header className='SideContent-header'>
        <h2>Search</h2>
        <p className='SideContent-description u-small-text'>
          <strong className='SideContent-strong'>Find the code part trough all files.</strong>
          <br />
          You can also search for a specific folder or file using the fields below.
        </p>
      </header>

      <div className='SideContent-body SearchContent'>
        <form onSubmit={(e) => e.preventDefault()} className='SearchContent-search'>
          <input className='u-textarea' placeholder='Search' />

          <div className='SearchContent-searchOptionals'>
            <input type='text' id='search-folder' className='u-input' placeholder='folder' />
            <input type='text' id='search-file' className='u-input' placeholder='file' />
          </div>
        </form>

        <SideHeading icon={<BiLogInCircle className='SideContent-headingIcon' />} title='Results' />

        {/* temp: search results but dynamic - template */}
        <div className='SearchContent-searchResults SearchResults'>
          <div className='SearchResults-item'>
            <strong className='SideContent-strong'>directory</strong>
            <ul className='SearchResults-list'>
              {/* Temp: Just a template */}
              <SearchList
                keyword='searched keyword'
                line='20'
                icon={<BiLogoHtml5 className='SearchResults-icon' fill='#dc4c25' />}
                iterations={3}
              />
              <SearchList
                keyword='keyword'
                line='12'
                icon={<BiLogoCss3 className='SearchResults-icon' fill='#3595cf' />}
                iterations={2}
              />
              <SearchList
                keyword='key'
                line='10'
                icon={<BiLogoJavascript className='SearchResults-icon' fill='#e8d44d' />}
                iterations={4}
              />
            </ul>
          </div>
        </div>

        <ul className='SearchContent-searchResults SearchResults'>
          <li className='SearchResults-item'>
            <div className='SearchResults-filePath'>
              <BiLogoTypescript className='SearchResults-icon' fill='#2f74c0' />
              <strong className='SideContent-strong'>path</strong>
            </div>
            <ul className='SearchResults-foundList'>
              <li className='SearchResults-foundItem'>
                <span className='SearchResults-word'>searched keyword</span>
                <span className='SearchResults-line'>20</span>
              </li>
              <li className='SearchResults-foundItem'>
                <span className='SearchResults-word'>searched keyword</span>
                <span className='SearchResults-line'>20</span>
              </li>
            </ul>
          </li>
          <li className='SearchResults-item'>
            <div className='SearchResults-filePath'>
              <BiLogoTypescript className='SearchResults-icon' fill='#2f74c0' />
              <strong className='SideContent-strong'>path</strong>
            </div>
            <ul className='SearchResults-foundList'>
              <li className='SearchResults-foundItem'>
                <span className='SearchResults-word'>searched keyword</span>
                <span className='SearchResults-line'>20</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* ... */}
    </>
  )
}
