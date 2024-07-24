import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const MenuLink = ({ to, icon, tooltip, className, onClick }) => (
	<OverlayTrigger
		placement='bottom'
		overlay={<Tooltip id='tooltip-top'>{tooltip}</Tooltip>}
	>
		<Link
			className={`content-center w-[40px] h-[40px] rounded-full ${className}`}
			to={to}
			data-tip={tooltip}
			onClick={onClick}
		>
			<i className={`bi ${icon}`} />
		</Link>
	</OverlayTrigger>
)
