import { ACTION_TYPE } from './action-type'

export const setCategoryId = (categoryId) => ({
	type: ACTION_TYPE.SET_CATEGORY_ID,
	payload: categoryId
})
