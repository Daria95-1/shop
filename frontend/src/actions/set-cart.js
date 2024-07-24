import { ACTION_TYPE } from './action-type'

export const setCart = (items) => ({
	type: ACTION_TYPE.SET_CART,
	payload: items
})
