export default function Packages() {
  return (
    <>
      <div className='Content-header'>
        <h2>Packages</h2>
        <p className='u-small-text'>Import npm packages into your project using CDNs.</p>
      </div>

      <div className='Content-body'>
        <input type='search' placeholder='Search npm packages' />

        <div>
          <ul>
            <li>
              <strong>package name</strong>
              <span>description</span>
            </li>
            <li>
              <strong>package name</strong>
              <span>description</span>
            </li>
          </ul>
        </div>

        <div>
          <div>
            <h4>recent packages</h4>
            <ul>
              <li>
                <strong>package name</strong>
                <span>description</span>
              </li>
            </ul>
          </div>
          <div>
            <h4>recent packages</h4>
            <ul>
              <li>
                <strong>package name</strong>
                <span>description</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
