import PropTypes from 'prop-types'

export default function Button({ className, icon, title, ...props }) {
  return (
    <button className={`u-button ${className ? className : ''}`} {...props}>
      {icon}
      <span className='u-button-title'>{title}</span>
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
}
