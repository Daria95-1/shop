import { useEffect, useState } from 'react'
import { Link, Outlet, useMatch } from 'react-router-dom'
import { AdminMenuItem } from '../../components/admin-menu-item/admin-menu-item'
import { PageAdmin } from './components'
import { ColorLink, PrivateContent } from '../../components'
import { ROLE } from '../../constants'
import { selectTheme } from '../../selectors'
import { useSelector } from 'react-redux'

export const Admin = () => {
	const isDarkMode = useSelector(selectTheme)
	const isAdminPath = useMatch('/admin')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (isLoading) {
			setIsLoading(true)
			return <div className='loader'></div>
		}

		if (error) {
			return setError(error)
		}
	}, [error, isLoading])

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
			<div className='flex flex-col max-w-[1300px] h-full mx-auto mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px] pl-6 pr-6'>
				{/* breadcrumbs */}
				<div className='flex text-sm mb-6'>
					<i
						className={`bi bi-arrow-left text-base ${isDarkMode ? 'title-orange' : 'blue'}`}
					/>
					<ColorLink page='Главная /' route='/' />
					<div className='ml-2'>Панель администратора</div>
				</div>
				<div className='flex flex-col laptop:flex-row w-full h-[670px]  rounded-xl p-0'>
					{/* меню */}
					<div className='panel-blue flex flex-col rounded-tl-md rounded-bl-md pt-12 space-y-2 text-white w-full laptop:w-80 h-auto laptop:h-full laptop:rounded-bl-md'>
						<Link className='pl-8 text-2xl font-medium' to='/'>
							LOGO
						</Link>
						<div className='pl-8'>
							<select
								className='language-select w-40 h-10 rounded-sm text-white pl-2'
								id='language'
								name='language'
							>
								<option value='ru'>Русский</option>
							</select>
						</div>

						<AdminMenuItem
							to='item'
							icon='bi-clipboard2-heart-fill'
							children='Товары'
						/>

						<AdminMenuItem
							to='users'
							icon='bi bi-people-fill'
							children='Пользователи'
						/>

						<AdminMenuItem
							to='deliver'
							icon='bi-box-seam-fill'
							children='Доставки'
						/>

						<AdminMenuItem
							to='settings'
							icon='bi-gear-fill'
							children='Настройки'
						/>
					</div>
					{/* контент */}
					<div className='main-content flex justify-center pt-8 pl-4 pr-4 pb-8 dark:bg-slate-700 dark:text-white w-full text-wrap shadow rounded-tr-md rounded-br-md'>
						{isAdminPath ? <PageAdmin /> : <Outlet />}
					</div>
				</div>
			</div>
		</PrivateContent>
	)
}
