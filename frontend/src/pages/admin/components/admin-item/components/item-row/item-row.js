import { ColumnName, Icon } from '../../../../../../components'
import { TableRow } from './components'
import PropTypes from 'prop-types'

export const ItemRow = ({ title, price, categoryName, onItemEdit, onItemRemove }) => {
	return (
		<div className='row flex items-center justify-start mb-3 border-b'>
			<TableRow>
				<ColumnName name='title' children={title} />
				<ColumnName name='category-name' children={categoryName} />
				<ColumnName name='price' children={price} />

				<Icon
					className='blue dark:title-orange cursor-pointer'
					icon='bi-pencil-square'
					onClick={onItemEdit}
				/>

				<Icon
					className='blue dark:title-orange cursor-pointer ml-4 mr-4'
					icon='bi-trash3'
					onClick={onItemRemove}
				/>
			</TableRow>
		</div>
	)
}

ItemRow.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	categoryName: PropTypes.string.isRequired,
	onItemEdit: PropTypes.func.isRequired,
	onItemRemove: PropTypes.func.isRequired
}
