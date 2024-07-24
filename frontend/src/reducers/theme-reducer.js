import { ACTION_TYPE } from '../actions'

const initialState = {
	isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false
}

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.TOGGLE_DARK_MODE:
			const newDarkModeState = !state.isDarkMode
			localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState))
			return {
				...state,
				isDarkMode: newDarkModeState
			}
		default:
			return state
	}
}
