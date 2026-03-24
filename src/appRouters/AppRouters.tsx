import { Route, Routes } from "react-router"
import PokemonPage from "../components/PokemonPage"
import Layout from "./Layout"
import App from "../App"
import Pokedex from "../components/Pokedex"
import PlayerPokemonLibrary from "../components/PlayerPokemonLibrary"

const AppRouters = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<App />} />
				<Route path='/pokedex/:pokemon' element={<PokemonPage />} />
				<Route path='/pokedex' element={<Pokedex />} />
				<Route path='/library' element={<PlayerPokemonLibrary />} />
			</Route>
		</Routes>
	)
}

export default AppRouters
