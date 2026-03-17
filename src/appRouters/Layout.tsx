import { Outlet } from 'react-router'
import Overview from '../overview/Overview'

const Layout = () => {
	return (
		<>
			<Overview />
			<Outlet />
		</>
	)
}

export default Layout
