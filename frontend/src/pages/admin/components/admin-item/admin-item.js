import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { selectItem, selectUserRole } from '../../../../selectors'
import { Content, ItemForm } from './components'
import { RESET_ITEM_DATA, loadItemAsync } from '../../../../actions'
import { checkAccess } from '../../../../utils'
import { Error } from '../../../../components'
import { ROLE } from '../../../../constants'

export const AdminItem = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const item = useSelector(selectItem)
	const isCreating = !!useMatch('/admin/create')
	const isEditing = !!useMatch('/admin/item/:id/edit')
	const isItemIdRoute = useMatch('/admin/item/:id')

	const userRole = useSelector(selectUserRole)
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (isItemIdRoute) {
			navigate('/admin/item')
		}
	}, [isItemIdRoute, navigate, isEditing])

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		if (isCreating) {
			dispatch(RESET_ITEM_DATA)
			setIsLoading(false)
			return
		}

		dispatch(loadItemAsync(params.id)).then((itemData) => {
			if (itemData.error) {
				setError(itemData.error)
			} else {
				setError(null)
			}
			setIsLoading(false)
		})
	}, [dispatch, params.id, isCreating, userRole])

	useEffect(() => {
		setError(null)

		return () => {
			setError(null)
		}
	}, [isCreating, isEditing])

	if (isLoading) {
		return <div className='loader'></div>
	}

	if (isEditing && error) {
		return <Error error={error} />
	}

	return (
		<div>
			{isCreating || isEditing ? <ItemForm item={item} /> : <Content />}
		</div>
	)
}
