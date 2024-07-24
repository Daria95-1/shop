import { request } from '../utils'
import { setItemData } from './set-item-data'

export const loadItemAsync = (itemId) => (dispatch) => {
	const loadRequest = itemId ? request(`/items/${itemId}`) : request(`/items`)

	return loadRequest.then((itemData) => {
		if (itemData.data) {
			dispatch(setItemData(itemData.data))
		}

		return itemData
	})
}
