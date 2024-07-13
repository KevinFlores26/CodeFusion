export default function ExportMenu() {
  return (
    <>
      <div className='Content-header'>
        <h2>Export</h2>
        <p className='u-small-text'>Export, share or download your project.</p>
      </div>

      <div className='Content-body'>
        <div>
          <div>
            <h4>Export</h4>
            <hr />
          </div>

          <div>
            <button>
              <i></i>
              Upload
            </button>
            <button>
              <i></i>
              Copy to
            </button>
          </div>
        </div>

        <div>
          <div>
            <h4>Share</h4>
            <hr />
          </div>

          <div>
            <button>
              <i></i>
              Clipboard
            </button>
            <button>
              <i></i>
              Download Json
            </button>
          </div>
        </div>

        <div>
          <div>
            <h4>Local</h4>
            <hr />
          </div>

          <button>
            <i></i>
            Download Zip
          </button>
        </div>
      </div>
    </>
  )
}
