import { Route, Routes } from "react-router"
import PokemonPage from "../components/PokemonPage"
import PokemonsList from "../components/PokemonsList"
import Overview from "../overview/Overview"

const AppRouters = () => {
	return (
		<Routes>
			<Route path='/' element={<Overview />} />
			<Route path='/pokemon-page' element={<PokemonPage />} />
			<Route path='/pokemon-list' element={<PokemonsList />} />
		</Routes>
	)
}

export default AppRouters
