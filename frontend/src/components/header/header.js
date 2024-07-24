import 'bootstrap-icons/font/bootstrap-icons.css'
import { ControlPanel, Logo } from './components'

export const Header = () => {
	return (
		<div className='fixed z-10 blue-bg w-full'>
			<div className='flex flex-col tablet:flex-row items-center justify-between mx-auto mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px] pt-2 pr-6 pb-2 pl-6'>
				<Logo />
				<ControlPanel />
			</div>
		</div>
	)
}
