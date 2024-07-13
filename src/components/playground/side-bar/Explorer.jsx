import { BiRightArrow } from 'react-icons/bi'
import Split from 'react-split'

export default function Explorer() {
  return (
    <>
      <div className='Content-header'>
        <h2>Explorer</h2>
        <h3 className='u-small-text'>Project name</h3>
      </div>

      <div className='Content-body'>
        <Split
          className='split'
          direction="vertical"
        >
          {/* temp: explorer results but dynamic - template */}
          <ul>
            <li>
              <i>{/* temp: icon file */}</i>
              <span>file name</span>
            </li>
          </ul>

          <div>
            <h4>recent files</h4>

            <ul>
              <li>
                <i>{/* temp: icon file */}</i>
                <span>file name</span>
              </li>
            </ul>
          </div>
        </Split>

        <button>
          <BiRightArrow /> Run Preview
        </button>
      </div>
    </>
  )
}
