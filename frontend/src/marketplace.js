import { Routes, Route } from 'react-router-dom'
import { Header, Footer, Modal, Error, BackToTop } from './components'
import {
	Admin,
	Authorization,
	Cart,
	Categories,
	Item,
	Main,
	Registration
} from './pages'
import { Users, PageInProgress, AdminItem } from './pages/admin/components'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from './selectors'
import { useLayoutEffect } from 'react'
import { setCart, setUser } from './actions'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ERROR } from './constants'

export const Marketplace = () => {
	const dispatch = useDispatch()
	const isDarkMode = useSelector(selectTheme)

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')
		const storedDarkModeJSON = localStorage.getItem('isDarkMode')
		const storedCartItemsJSON = sessionStorage.getItem('cartItems')

		const storedDarkMode = JSON.parse(storedDarkModeJSON)
		if (storedDarkMode !== null) {
			document.body.classList.toggle('dark', storedDarkMode)
		}

		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId)
			})
		)

		if (storedCartItemsJSON) {
			const storedCartItems = JSON.parse(storedCartItemsJSON)
			dispatch(setCart(storedCartItems))
		}
	}, [dispatch, isDarkMode])

	return (
		<div
			className={`page w-full ${isDarkMode ? 'bg-slate-800 text-white' : ''}`}
		>
			<Header />
			<div className='flex justify-center mt-24 mb-16'>
				<div>
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/categories' element={<Categories />} />
						<Route path='/login' element={<Authorization />} />
						<Route path='/register' element={<Registration />} />
						<Route path='/admin' element={<Admin />}>
							<Route path='users' element={<Users />} />
							<Route path='item' element={<AdminItem />} />
							<Route path='create' element={<AdminItem />} />
							<Route path='item/:id' element={<AdminItem />} />
							<Route
								path='item/:id/edit'
								element={<AdminItem />}
							/>
							<Route
								path='deliver'
								element={<PageInProgress />}
							/>
							<Route
								path='settings'
								element={<PageInProgress />}
							/>
						</Route>
						<Route path='/cart' element={<Cart />} />
						<Route path='/item/:id' element={<Item />} />
						<Route path='/item/:id/edit' element={<Item />} />
						<Route
							path='*'
							element={<Error error={ERROR.PAGE_NOTE_EXIST} />}
						/>
					</Routes>
				</div>
			</div>
			<BackToTop />
			<Footer />
			<Modal />
		</div>
	)
}
