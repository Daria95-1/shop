/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				'dark-bg': '#1F2937'
			},
			backgroundImage: {
				'empty-cart-pattern': "url('/src/image/add_to_cart.svg')",
				'404-pattern': "url('/src/image/404.svg')",
				banner: "url('/src/image/banner.svg')",
				'no-data': "url('/src/image/no_data.svg')",
				'offer-1': "url('/src/image/offer 1.svg')",
				'offer-2': "url('/src/image/offer 2.svg')",
				'offer-3': "url('/src/image/offer 3.svg')",
				'offer-4': "url('/src/image/offer 4.svg')"
			}
		},
		screens: {
			mobile: '570px',
			tablet: '640px',
			laptop: '1024px',
			minDesktop: '1280px',
			desktop: '1536px'
		}
	},
	corePlugins: {
		float: true,
		clear: true
	}
}

