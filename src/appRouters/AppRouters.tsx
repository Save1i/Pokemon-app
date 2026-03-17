import { Route, Routes } from "react-router"
import PokemonPage from "../components/PokemonPage"
import PokemonsList from "../components/PokemonsList"
import Layout from "./Layout"
import App from "../App"

const AppRouters = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<App />} />
				<Route path='/pokemon-page' element={<PokemonPage />} />
				<Route path='/pokemon-list' element={<PokemonsList />} />
			</Route>
		</Routes>
	)
}

export default AppRouters
