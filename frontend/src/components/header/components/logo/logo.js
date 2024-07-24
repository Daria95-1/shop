import { Link } from 'react-router-dom'

export const Logo = () => {
	return (
		<Link className='logo' to='/'>
			<p className='logo-shadow'>LOGO</p>
		</Link>
	)
}
