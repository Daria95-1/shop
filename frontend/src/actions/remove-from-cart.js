import { ACTION_TYPE } from './action-type'

export const removeFromCart = (item) => ({
	type: ACTION_TYPE.REMOVE_FROM_CART,
	payload: item
})
