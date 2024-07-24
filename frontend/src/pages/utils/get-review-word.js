export const getReviewWord = (count) => {
	count = Math.abs(count) % 100
	const lastDigit = count % 10
	const lastTwoDigits = count % 100

	if (lastTwoDigits > 10 && lastTwoDigits < 20) {
		return 'отзывов'
	}

	if (lastDigit === 1) {
		return 'отзыв'
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return 'отзыва'
	}

	return 'отзывов'
}
