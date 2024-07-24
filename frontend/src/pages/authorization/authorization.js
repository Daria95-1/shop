import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { setUser } from '../../actions'
import { Input, Button, AuthError, Icon } from '../../components'
import { selectUserRole } from '../../selectors'
import { ROLE } from '../../constants/role'
import { useResetForm } from '../../hooks/use-reset-form'
import { request } from '../../utils'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.matches(
			/^\w+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры'
		)
		.min(2, 'Неверно заполнен логин. Минимум 2 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %'
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
})

export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			login: '',
			password: ''
		},
		resolver: yupResolver(authFormSchema)
	})

	const [serverError, setServerError] = useState(null)
	const [showPassword, setShowPassword] = useState(false)
	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`)
					return
				}

				dispatch(setUser(user))
				sessionStorage.setItem('userData', JSON.stringify(user))
			}
		)
	}

	const formError = errors?.login?.message || errors?.password?.message

	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />
	}

	return (
		<div className='flex flex-col items-center justify-center mt-[150px]'>
			<div className='dark:bg-slate-700 flex flex-col items-center text-center p-12 gap-3 shadow rounded-xl'>
				<h2 className='text-xl tablet:text-3xl font-semibold'>
					Авторизация
				</h2>
				<form
					className='flex flex-col w-full mobile:w-80 gap-3'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input
						type='text'
						placeholder='Введите логин'
						{...register('login', {
							onChange: () => setServerError(null)
						})}
					/>

					<div className='relative w-full'>
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder='Введите пароль'
							{...register('password', {
								onChange: () => setServerError(null)
							})}
						/>
						<Button
							type='button'
							className='absolute inset-y-1 right-0 px-3 flex items-center focus:outline-none text-gray-400'
							onClick={() => {
								setShowPassword(!showPassword)
							}}
						>
							<Icon
								className={`${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
							/>
						</Button>
					</div>

					<Button
						className='button h-12'
						type='submit'
						disabled={!!formError}
					>
						Войти
					</Button>

					{errorMessage && <AuthError>{errorMessage}</AuthError>}
				</form>
			</div>

			<Link
				className='dark:text-white link font-normal mt-6 text-lg'
				to='/register'
			>
				Регистрация
			</Link>
		</div>
	)
}
