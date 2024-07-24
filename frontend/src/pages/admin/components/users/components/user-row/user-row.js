import { ColumnName, Icon } from '../../../../../../components'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { PROP_TYPE } from '../../../../../../constants'
import { request } from '../../../../../../utils'

export const UserRow = ({
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(
			() => {
				setInitialRoleId(newUserRoleId)
			}
		)
	}

	const isSaveButtonDisabled = selectedRoleId === initialRoleId

	return (
		<div className='row flex items-center mt-3 mb-3'>
			<div className='flex items-center justify-start mb-3 border-b gap-1'>
				<ColumnName name='login' children={login} />
				<ColumnName name='registed-at' children={registeredAt} />
				<ColumnName name='role'>
					<select
						className='select-role dark:bg-gray-700'
						value={selectedRoleId}
						onChange={onRoleChange}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
				</ColumnName>

				<Icon
					className={`blue dark:title-orange cursor-pointer ${isSaveButtonDisabled ? 'disabled' : ''}`}
					icon='bi-floppy'
					disabled={isSaveButtonDisabled}
					onClick={() => onRoleSave(id, selectedRoleId)}
				/>
				<Icon
					className='blue dark:title-orange cursor-pointer ml-4 mr-4'
					icon='bi-trash3'
					onClick={onUserRemove}
				/>
			</div>
		</div>
	)
}

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired
}
