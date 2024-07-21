import PropTypes from "prop-types";

export default function SideHeading({ icon, title }) {
  return (
    <div className='SideContent-heading'>
      <span className='SideContent-headingTitle u-heading4'>
        {icon}
        <h4 className='SideContent-h4'>{title}</h4>
      </span>

      <hr className='SideContent-hr' />
    </div>
  )
}

SideHeading.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired
}
