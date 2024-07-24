export const truncateContent = (content) => {
	return content.length > 200 ? `${content.substring(0, 200)}...` : content
}
