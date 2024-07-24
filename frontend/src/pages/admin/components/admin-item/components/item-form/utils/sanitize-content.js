export const sanitizeContent = (content) =>
	content
		.replace(/&nbsp;/g, ' ')
		.replace(/<div><br><\/div>/g, '\n')
		.replace(/<div><\/div>/g, '\n')
		.replace(/<br>/g, '\n')
		.replace(/<\/div><div>/g, '\n')
		.replace(/<div>/g, '\n')
		.replace(/<\/div>/g, '')
		.replace(/\s+/g, ' ')
		.trim()
