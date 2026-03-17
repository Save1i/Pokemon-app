import { Route, Routes } from "react-router"
import PokemonPage from "../components/PokemonPage"
import Layout from "./Layout"
import App from "../App"
import Pokedex from "../components/Pokedex"

const AppRouters = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<App />} />
				<Route path='/pokemon-page/:pokemon' element={<PokemonPage />} />
				<Route path='/pokedex' element={<Pokedex />} />
			</Route>
		</Routes>
	)
}

export default AppRouters
