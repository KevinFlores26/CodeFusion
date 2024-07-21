import PropTypes from "prop-types";

export default function SearchResult({ keyword, line }) {
  return (
    <li className='SearchResults-foundItem'>
      <span className='SearchResults-word'>{keyword}</span>
      <span className='SearchResults-line'>{line}</span>
    </li>
  )
}

SearchResult.propTypes = {
  keyword: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired
}
