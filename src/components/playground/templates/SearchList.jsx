import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import SearchResult from '@components/playground/templates/SearchResult'

// Temp: Just a template
export default function SearchList({ keyword, line, icon, iterations = 1 }) {
  const [results, setResults] = useState([])
  useEffect(() => {
    if (iterations < 1) return <span>No results</span>

    let list = []
    while (iterations--)
      list.push(<SearchResult key={`searchResults-${iterations}`} keyword={keyword} line={line} />)

    setResults(list)
  }, [iterations, keyword, line])

  return (
    <li className='SearchResults-result'>
      <div className='SearchResults-filePath'>
        {icon}
        <strong className='SideContent-strong'>path/file</strong>
      </div>
      <ul className='SearchResults-foundList'>
        {results}
      </ul>
    </li>
  )
}

SearchList.propTypes = {
  keyword: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  iterations: PropTypes.number
}
