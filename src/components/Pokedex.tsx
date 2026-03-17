import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import type { NamedAPIResource } from "./PokemonPage"
import { NavLink } from "react-router"

interface Named {
	count: number
	next: string
	previous?: string
	results: Array<NamedAPIResource>
}

const Pokedex = () => {
	const [pokemons, setPokemons] = useState<Named | null>(null)
	
	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20").then((el) => el.json()).then((el) => setPokemons(el))
	}, [])
	
	if(pokemons === null) {
		return <p>Loading...</p>
	}
	
	if(pokemons.results.length === 0) {
		return <p>No pokemons</p>
	}
	
	return (
		<ul>
			{
				pokemons.results.map((pokemon) => {
					return (
						<li key={nanoid()}>
							<NavLink
								to={`/pokemon-page/${pokemon.name}`}
								className={({ isActive }) =>
									isActive ? 'active-link fw-bold' : ''
								}
							>
								{pokemon.name}
							</NavLink>
						</li>
					)
				})
			}
		</ul>
	)
}

export default Pokedex
