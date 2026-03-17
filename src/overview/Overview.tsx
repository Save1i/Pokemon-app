import { NavLink } from 'react-router'

const Overview = () => {
	return (
		<nav className='navigation_bar d-flex gap-4'>
			<NavLink
				to='/'
				end
				className={({ isActive }) => (isActive ? 'active-link fw-bold' : '')}
			>
				Home
			</NavLink>

			<NavLink
				to='/pokedex'
				className={({ isActive }) => (isActive ? 'active-link fw-bold' : '')}
			>
				Pokedex
			</NavLink>
		</nav>
	)
}

export default Overview