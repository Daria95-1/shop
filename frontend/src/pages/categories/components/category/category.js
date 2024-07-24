import { useSelector } from 'react-redux'
import { selectCategories } from '../../../../selectors'
import PropTypes from 'prop-types'

export const Category = ({ selectedCategoryId, onCategoryChange }) => {
	const categories = useSelector(selectCategories)

	if (!categories || categories.length === 0) {
		return <div>Нет категорий</div>
	}

	return (
		<div className='flex flex-col w-full h-auto items-start'>
			{categories.map((category) => (
				<button
					key={category.id}
					className={`w-full text-left py-1 pl-4 ${
						category.id === selectedCategoryId
							? 'orange rounded text-black'
							: 'bg-transparent ext-white'
					}`}
					onClick={() => onCategoryChange(category.id)}
				>
					{category.name}
				</button>
			))}
		</div>
	)
}

Category.propTypes = {
	selectedCategoryId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onCategoryChange: PropTypes.func.isRequired
}
