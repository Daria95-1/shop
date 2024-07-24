import { Button, Icon } from '../../../components'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../selectors'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ItemOfCart = ({
	id,
	imageUrl,
	title,
	price,
	brand,
	count,
	quantity,
	onRemoveItem,
	onUpdateQuantity
}) => {
	const isDarkMode = useSelector(selectTheme)

	return (
		<div>
			<div key={id} className='flex items-center justify-between rounded'>
				<Link to={`/item/${id}`} className='block'>
					<img
						className='w-28 h-36 object-cover rounded shadow-sm'
						src={imageUrl}
						alt={title}
					/>
				</Link>
				<div className='flex flex-1 justify-between pl-6'>
					<div>
						<div className='text-base tablet:text-lg font-semibold'>
							{title}
						</div>
						<div
							className={`${
								isDarkMode ? 'title-orange' : 'blue'
							}`}
						>
							{price} ₽
						</div>
						<div className='text-gray-600'>{brand}</div>
						<div className='flex flex-col laptop:flex-row'>
							<p className='text-gray-400'>Отказ:</p>
							<p className='divide-dashed'>200 ₽</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<button
							className='counter rounded'
							onClick={() => onUpdateQuantity(id, quantity - 1)}
							disabled={quantity <= 1}
						>
							-
						</button>

						<div>{quantity}</div>

						<button
							className='counter rounded'
							onClick={() => onUpdateQuantity(id, quantity + 1)}
							disabled={quantity > count}
						>
							+
						</button>
					</div>
				</div>
				<Button className='ml-4' onClick={() => onRemoveItem(id)}>
					<Icon className='bi-trash-fill text-xl' />
				</Button>
			</div>
		</div>
	)
}

ItemOfCart.propTypes = {
	id: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	brand: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	onUpdateQuantity: PropTypes.func.isRequired
}
