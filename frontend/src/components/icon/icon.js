import PropTypes from 'prop-types'

export const Icon = ({ className, icon, ...props }) => (
	<div className={`${className}`} {...props}>
		<i className={`bi ${icon}`} aria-hidden='true'></i>
	</div>
)

Icon.propTypes = {
	icon: PropTypes.string
}
