import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'

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

  const [page, setPage] = useState<number>(0)
  const limitOfRender = useRef<number>(20)

  useEffect(() => {
    if(!lastPokemon) {
      navigate('/pokedex')
      return
    }

    navigate(`/pokedex/${lastPokemon}`)
  }, [lastPokemon])

	useEffect(() => {
    const offset = limitOfRender.current * page

    if(page || page >= 0) {
      fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitOfRender.current}`)
        .then(el => el.json())
        .then(el => {
          if (pokemons === null) {
            setPokemons(el.results)
          } else {
            setPokemons([...pokemons, ...el.results])
          }
        })
    }
	}, [page])

	if (pokemons === null) {
		return <p>Loading...</p>
	}

  const loadMorePokemons = () => {
    setPage(page + 1)
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
      <button onClick={() => {
        loadMorePokemons()
      }}>load more</button>
		</div>
	)
}

export default Pokedex
