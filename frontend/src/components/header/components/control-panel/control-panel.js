import 'bootstrap/dist/css/bootstrap.min.css'
import { ROLE } from '../../../../constants/role'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectCartItems,
	selectTheme,
	selectUserLogin,
	selectUserRole
} from '../../../../selectors'
import { MenuLink } from '../menu-link/menu-link'
import { logout } from '../../../../actions/logout'
import { Link } from 'react-router-dom'
import { toggleDarkMode } from '../../../../actions'
import { Button } from '../../../button/button'
import { checkAccess } from '../../../../utils/check-access'

export const ControlPanel = () => {
	const dispatch = useDispatch()
	const userRole = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const isDarkMode = useSelector(selectTheme)
	const cartItems = useSelector(selectCartItems)

	const onToggleDarkTheme = () => {
		dispatch(toggleDarkMode())
	}

	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div className='flex text-center gap-3'>
			<div className='flex items-center gap-2'>
				{isAdmin && (
					<MenuLink
						className='orange blue'
						to='/admin'
						icon='bi-briefcase-fill'
						tooltip='Магазин'
					/>
				)}

				{isDarkMode ? (
					<MenuLink
						className='blue white'
						icon='bi-brightness-high-fill'
						tooltip='Светлая тема'
						onClick={onToggleDarkTheme}
					/>
				) : (
					<MenuLink
						className=' white blue'
						icon='bi-moon-stars-fill'
						tooltip='Темная тема'
						onClick={onToggleDarkTheme}
					/>
				)}

				<div className='relative flex white w-[40px] h-[40px] items-center rounded-full'>
					<MenuLink
						className='white blue relative'
						to='/cart'
						icon='bi-bag-fill'
						tooltip='Корзина'
					/>
					{cartItems.length > 0 && (
						<div className='absolute top-[-4px] right-[-4px] bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center'>
							{cartItems.length}
						</div>
					)}
				</div>
			</div>

			{userRole === ROLE.GUEST ? (
				<Button className='login-button font-medium'>
					<Link to='/login'>Войти</Link>
				</Button>
			) : (
				<Button className='login-button font-medium' onClick={onLogout}>
					<MenuLink
						className='text-2xl'
						icon='bi-box-arrow-left'
						tooltip='Выйти'
					/>
					{login}
				</Button>
			)}
		</div>
	)
}
