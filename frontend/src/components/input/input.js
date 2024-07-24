import { forwardRef } from 'react'

export const Input = forwardRef(({ ...props }, ref) => {
	return (
		<input
			className='form-input w-full h-12 pl-3 text-base dark:bg-slate-600 bg-gray-100 border-white rounded-lg'
			{...props}
			ref={ref}
		/>
	)
})
