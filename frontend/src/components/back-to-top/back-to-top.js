import { useEffect, useState } from 'react'

export const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false)

	const goTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		isVisible && (
			<div
				className='go-top font-bold text-2xl flex items-center justify-center'
				onClick={goTop}
			>
				<i className='bi bi-arrow-up' />
			</div>
		)
	)
}
