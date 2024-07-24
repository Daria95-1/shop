import { request } from '../utils'
import { setItemData } from './set-item-data'

export const saveItemAsync = (id, newItemData) => (dispatch) => {
	const saveRequest = id
		? request(`/items/${id}`, 'PATCH', newItemData)
		: request(`/items`, 'POST', newItemData)

	return saveRequest.then((updatedItem) => {
		dispatch(setItemData(updatedItem.data))

		return updatedItem.data
	})
}
