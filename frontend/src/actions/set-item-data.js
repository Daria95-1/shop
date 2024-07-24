import { ACTION_TYPE } from './action-type'

export const setItemData = (itemData) => ({
	type: ACTION_TYPE.SET_ITEM_DATA,
	payload: itemData
})
