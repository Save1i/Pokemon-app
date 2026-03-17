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
				to='/pokemon-page'
				className={({ isActive }) => (isActive ? 'active-link fw-bold' : '')}
			>
				Pokemon Page
			</NavLink>

			<NavLink
				to='/pokemon-list'
				className={({ isActive }) => (isActive ? 'active-link fw-bold' : '')}
			>
				Pokemon List
			</NavLink>
		</nav>
	)
}

export default Overview