export default function ImportMenu() {
  return (
    <>
      <div className='Content-header'>
        <h2>Import</h2>
        <p className='u-small-text'>
          Import other projects, folders or files into this project
          <br />
          <small>
            Only web files are supported. <a href='#'>Check the full list.</a>
          </small>
        </p>
      </div>

      <div className='Content-body'>
        <div>
          <div>
            <h4>Search Project</h4>
            <hr />
          </div>

          <button>
            <i></i>
            Open Search
          </button>
        </div>

        <div>
          <div>
            <h4>Clipboard/URL</h4>
            <hr />
          </div>

          <textarea id='clipboard-import'></textarea>
        </div>

        <div>
          <div>
            <h4>From local</h4>
            <hr />
          </div>

          <div>
            <input type='file' id='import-file' />
            <span>
              Drag and drop files here
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
