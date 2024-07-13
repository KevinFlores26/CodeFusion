export default function Search() {
  return (
    <>
      <div className="Content-header">
        <h2>Search</h2>
        <p className="u-small-text">
          Search through all files
          <br />
          You can also search for a specific folder or file using the fields below.
        </p>
      </div>

      <div className="Content-body">
        <div>
          <input type="search" placeholder="Search" />

          <div>
            <input type="text" id="search-folder" placeholder="folder" />
            <input type="text" id="search-file" placeholder="file" />
          </div>
        </div>

        <hr />

        {/* temp: search results but dynamic - template */}
        <ul>
          <li>
            <i>{/* temp: icon file */}</i>
            <strong>path</strong>
            <span>searched keyword</span>
          </li>
        </ul>
        <ul>
          <li>
            <i>{/* temp: icon file */}</i>
            <strong>path</strong>
            <span>searched keyword</span>
          </li>
        </ul>
        <ul>
          <li>
            <i>{/* temp: icon file */}</i>
            <strong>path</strong>
            <span>searched keyword</span>
          </li>
        </ul>
      </div>
      {/* ... */}
    </>
  )
}
