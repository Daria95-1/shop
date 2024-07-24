export const truncateTitle = (title) => {
	return title.length > 12 ? `${title.substring(0, 12)}...` : title
}
