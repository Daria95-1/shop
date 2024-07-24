import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectTheme, selectUserRole } from '../../selectors'
import { removeFromCart, setCart, updateCartItemQuantity } from '../../actions'
import { Button } from 'react-bootstrap'
import { ItemOfCart } from './components/item-of-cart'
import { ColorLink, Icon } from '../../components'
import { checkAccess } from '../../utils'
import { ROLE } from '../../constants'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CartModal } from './components/cart-modal/cart-modal'
import { EmptyCart } from './components/empty-cart/empty-cart'

export const Cart = () => {
	const isDarkMode = useSelector(selectTheme)

	const dispatch = useDispatch()
	const userRole = useSelector(selectUserRole)
	const isGuest = checkAccess([ROLE.GUEST], userRole)
	const cartItems = useSelector(selectCartItems)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const onRemoveItem = (id) => {
		dispatch(removeFromCart(id))
	}

	const onUpdateQuantity = (id, quantity) => {
		dispatch(updateCartItemQuantity(id, quantity))
	}

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	const addresses = [
		'Москва, ул. Тверская, 1',
		'Москва, ул. Арбат, 10',
		'Москва, ул. Ленинградский пр-т, 15',
		'Москва, ул. Новослободская, 20',
		'Москва, ул. Большая Ордынка, 25'
	]

	const onOrder = () => {
		sessionStorage.removeItem('cartItems')
		dispatch(setCart([]))
		setIsModalVisible(true)
	}

	const closeModal = () => {
		setIsModalVisible(false)
	}

	return (
		<div className='flex flex-col max-w-[1300px] mx-auto mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px]'>
			{/* breadcrumbs */}
			<div className='flex text-sm mb-2'>
				<i
					className={`bi bi-arrow-left text-base ${isDarkMode ? 'title-orange' : 'blue'}`}
				/>
				<ColorLink page='Главная /' route='/' />
				<div className='ml-2'>Корзина</div>
			</div>
			{cartItems.length === 0 ? (
				<EmptyCart />
			) : (
				<div className='flex flex-col justify-between w-full gap-6 mobile:flex-col tablet:flex-col laptop:flex-row'>
					<div
						className={`flex flex-col w-full items-center justify-start text-start mb-4 shadow p-6 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
					>
						<h2 className='text-2xl mb-4'>Корзина</h2>
						<div className='flex flex-col gap-4 w-full'>
							{cartItems.map(
								({
									id,
									imageUrl,
									title,
									price,
									brand,
									quantity,
									count
								}) => (
									<ItemOfCart
										key={id}
										id={id}
										imageUrl={imageUrl}
										title={title}
										price={price}
										brand={brand}
										count={count}
										quantity={quantity}
										onRemoveItem={onRemoveItem}
										onUpdateQuantity={onUpdateQuantity}
									/>
								)
							)}
						</div>
					</div>

					<div
						className={`flex flex-col w-full h-full laptop:w-80 laptop:h-96 gap-3 p-6 rounded shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
					>
						<div className='font-bold'>Доставка в пункт выдачи</div>
						<select
							className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
						>
							{addresses.map((address, index) => (
								<option key={index} value={address}>
									{address}
								</option>
							))}
						</select>
						<div className='flex gap-2'>
							<div className='flex items-center gap-2'>
								<Icon
									className={`bi-box-seam-fill text-lg ${
										isDarkMode ? 'title-orange' : 'blue'
									}`}
								/>
								<p>Приедет:</p>
								<p
									className={`${
										isDarkMode ? 'title-orange' : 'blue'
									}`}
								>
									завтра
								</p>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<Icon
								className={`bi-credit-card-2-back-fill text-lg ${
									isDarkMode ? 'title-orange' : 'blue'
								}`}
							/>
							<p>Оплата при получении</p>
						</div>
						<div className='text-xl font-bold'>
							Итого: {totalPrice} ₽
						</div>
						{isGuest ? (
							<Button className='button'>
								<Link to='/login'>Войти</Link>
							</Button>
						) : (
							<Button className='button' onClick={onOrder}>
								Оформить
							</Button>
						)}
					</div>
				</div>
			)}
			{isModalVisible && <CartModal onCloseModal={closeModal} />}
		</div>
	)
}
