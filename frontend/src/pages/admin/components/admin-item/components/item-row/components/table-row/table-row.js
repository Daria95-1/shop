import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../../../selectors'
import PropTypes from 'prop-types'

export const TableRow = ({ children }) => {
	const isDarkMode = useSelector(selectTheme)

	return (
		<div
			className={`flex justify-start h-12  font-normal ${isDarkMode ? 'dark:bg-slate-700' : 'bg-white'}`}
		>
			{children}
		</div>
	)
}

TableRow.propTypes = {
	children: PropTypes.node.isRequired
}
