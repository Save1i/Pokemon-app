import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router'
import { usePokemonStore } from '../store/pokemonStore'
import type { NamedAPIResource } from './PokemonPage'

interface Named {
	count: number
	next: string
	previous?: string
	results: Array<NamedAPIResource>
}

const Pokedex = () => {
  const navigate = useNavigate()
	const { lastPokemon } = usePokemonStore()
	const [pokemons, setPokemons] = useState<Array<NamedAPIResource> | null>(null)

  useEffect(() => {
    if(!lastPokemon) {
      navigate('/pokedex')
      return
    }

    navigate(`/pokedex/${lastPokemon}`)
  }, [])

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
			.then(el => el.json())
			.then(el => setPokemons(el.results))
	}, [])

	if (pokemons === null) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<ul>
				{pokemons.map(pokemon => (
					<li key={nanoid()}>
						<NavLink
							to={`/pokedex/${pokemon.name}`}
							className={({ isActive }) =>
								isActive ? 'active-link fw-bold' : ''
							}
						>
							{pokemon.name}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Pokedex
