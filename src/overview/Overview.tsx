import { NavLink } from "react-router"


const Overview = () => {
	return (
		<nav>
			<NavLink to='/' end>
				Home
			</NavLink>
			<NavLink to='/pokemon-page' end>
				pokemon-page
			</NavLink>
			<NavLink to='/pokemon-list'>pokemon-list</NavLink>
		</nav>
	)
}

export default Overview
