import { ACTION_TYPE } from './action-type'

export const setItemsData = (items) => ({
	type: ACTION_TYPE.SET_ITEMS_DATA,
	payload: items
})
