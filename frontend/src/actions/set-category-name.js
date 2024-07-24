import { ACTION_TYPE } from './action-type'

export const setCategoryName = (categoryName) => ({
	type: ACTION_TYPE.SET_CATEGORY_ID,
	payload: categoryName
})
