import { ACTION_TYPE } from '../actions'

const initialItemsCartState = {
	items: JSON.parse(sessionStorage.getItem('cartItems')) || []
}

const cartReducer = (state = initialItemsCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART:
			return {
				...state,
				items: action.payload
			}

		case ACTION_TYPE.ADD_TO_CART:
			const newStateAdd = {
				...state,
				items: [...state.items, { ...action.payload, quantity: 1 }]
			}
			sessionStorage.setItem(
				'cartItems',
				JSON.stringify(newStateAdd.items)
			)
			return newStateAdd

		case ACTION_TYPE.REMOVE_FROM_CART:
			const newStateRemove = {
				...state,
				items: state.items.filter((item) => item.id !== action.payload)
			}
			sessionStorage.setItem(
				'cartItems',
				JSON.stringify(newStateRemove.items)
			)
			return newStateRemove

		case ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY:
			const newStateUpdate = {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item
				)
			}
			sessionStorage.setItem(
				'cartItems',
				JSON.stringify(newStateUpdate.items)
			)
			return newStateUpdate

		default:
			return state
	}
}

export default cartReducer
