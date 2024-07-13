export default function Console() {
  return (
    <>
      <div className='Content-header'>
        <h2>Console</h2>
        <p className='u-small-text'>
          <strong className="u-paragraph">Here you can see the console output</strong>
          <br />
          Console methods and the most common warnings and errors/exceptions are supported
          <br />
          <small>If some unknown error occurs, please check the browser console too.</small>
        </p>
      </div>

      <div className='Content-body'>
        {/* temp: console output - template */}
        <ul>
          <li>
            <i>{/* temp: icon */}</i>
            Logs
            <span>count</span>
          </li>
          <li>
            <i>{/* temp: icon */}</i>
            Infos
            <span>count</span>
          </li>
          <li>
            <i>{/* temp: icon */}</i>
            Warnings
            <span>count</span>
          </li>
          <li>
            <i>{/* temp: icon */}</i>
            Errors
            <span>count</span>
          </li>
        </ul>

        <ul>
          <li>
            <i>{/* temp: icon console */}</i>
            <pre>
              {/* output here */}
              console log
            </pre>
          </li>
          <li>
            <i>{/* temp: icon console */}</i>
            <pre>
              {/* output here */}
              console log
            </pre>
          </li>
        </ul>
      </div>
    </>
  )
}
