import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const AdminMenuItem = ({ to, icon, className, children, onClick }) => (
	<Link
		className={`menu-item flex items-center h-10 pl-8 ${className}`}
		to={to}
		onClick={onClick}
	>
		<div className='admin-icon'>
			<i className={`bi ${icon}`} />
		</div>
		<div className='pl-2'>{children}</div>
	</Link>
)

AdminMenuItem.propTypes = {
	to: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func
}
