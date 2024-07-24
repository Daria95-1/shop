import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ColumnName, PrivateContent } from '../../../../components'
import { UserRow } from './components'
import { ROLE } from '../../../../constants'
import { TableHeader } from '../admin-item/components/content/components'
import { checkAccess, request } from '../../../../utils'
import { selectUserRole } from '../../../../selectors'

export const Users = () => {
	const userRole = useSelector(selectUserRole)
	const [roles, setRoles] = useState([])
	const [users, setUsers] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}

				setUsers(usersRes.data)
				setRoles(rolesRes.data)
				setIsLoading(false)
			}
		)
	}, [shouldUpdateUserList, userRole])

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	if (isLoading) {
		return <div className='loader'></div>
	}

	return (
		<div>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<div className='max-w-[910px] flex-wrap'>
					<h2 className='text-2xl font-bold mb-4'>Пользователи</h2>
					<p>
						Здесь вы можете управлять всеми зарегистрированными
						пользователями. Вам доступны следующие функции:
						изменение и удаление пользователя.
					</p>
				</div>

				<div className='max-h-96 overflow-y-auto'>
					<TableHeader className='row flex items-center'>
						<ColumnName name='login' children='Логин' />
						<ColumnName name='registed-at' children='Регистрация' />
						<ColumnName name='role' children='Роль' />
						<ColumnName name='role' children='Действие' />
					</TableHeader>

					<div className='table-fixed w-full'>
						{users.map(({ id, login, registeredAt, roleId }) => (
							<UserRow
								key={id}
								id={id}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(
									({ id: roleId }) => roleId !== ROLE.GUEST
								)}
								onUserRemove={() => onUserRemove(id)}
							/>
						))}
					</div>
				</div>
			</PrivateContent>
		</div>
	)
}
