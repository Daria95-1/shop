import { request } from '../utils'

export const removeItemAsync = (id) => () => request(`/items/${id}`, 'DELETE')
