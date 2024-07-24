import { useSelector } from 'react-redux'
import { selectCategories } from '../../../../../../../../selectors'
import PropTypes from 'prop-types'

export const SelectedCategory = ({
	className,
	selectedCategoryId,
	onCategoryChange
}) => {
	const categories = useSelector(selectCategories)

	return (
		<div>
			<select
				className={`select-role dark:bg-gray-700 items-center h-12 border rounded pl-2 ${className}`}
				value={selectedCategoryId}
				onChange={onCategoryChange}
			>
				{categories.map(({ id: categoryId, name: categoryName }) => (
					<option key={categoryId} value={categoryId}>
						{categoryName}
					</option>
				))}
			</select>
		</div>
	)
}

SelectedCategory.propTypes = {
	selectedCategoryId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onCategoryChange: PropTypes.func.isRequired
}
