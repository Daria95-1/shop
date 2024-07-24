import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../selectors'
import { Button, Icon } from '../../../../components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const CartModal = ({ onCloseModal }) => {
	const isDarkMode = useSelector(selectTheme)

	return (
		<div className='fixed inset-0 z-20 flex items-center justify-center'>
			<div className='absolute inset-0 bg-gray-800 opacity-60'></div>
			<div
				className={`relative flex flex-col items-center justify-center w-[400px] p-12 text-wrap rounded shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
			>
				<div className='absolute top-0 right-0 p-2'>
					<Icon
						className={`bi-x text-2xl cursor-pointer ${isDarkMode ? 'text-white' : 'text-blue-600'}`}
						onClick={onCloseModal}
					/>
				</div>
				<h3
					className={`flex items-center text-center justify-center text-lg font-normal ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
				>
					Ваш заказ оформлен. Наш менеджер свяжется с вами через
					несколько минут!
				</h3>

				<div className='flex w-full mt-4'>
					<Button className='button w-full'>
						<Link to='/'>На главную</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

CartModal.propTypes = {
	onCloseModal: PropTypes.func.isRequired
}
