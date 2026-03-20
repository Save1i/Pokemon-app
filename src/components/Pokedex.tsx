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

interface Pokemon {
  image: string
  name: string
}

const Pokedex = () => {
  const navigate = useNavigate()
	const { lastPokemon } = usePokemonStore()
	const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)

  const [page, setPage] = useState<number>(0)
  const limitOfRender = useRef<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  useEffect(() => {
    if(!lastPokemon) {
      navigate('/pokedex')
      return
    }

    navigate(`/pokedex/${lastPokemon}`)
  }, [lastPokemon])

	useEffect(() => {
    const fetchPokemonList = async () => {{
      if (isLoading || !hasMore) return

      setIsLoading(true)


      const offset = limitOfRender.current * page

      if(page || page >= 0) {

        try {
          const pokemonsName = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitOfRender.current}`)

          const data: Named = await pokemonsName.json()

          setHasMore(!!data.next)

          const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url)
            const detailData = await detailResponse.json()

            const img = new Image()
            img.src = detailData.sprites.front_default
            await img.decode()

            return {
              image: detailData.sprites.front_default,
              name: detailData.name
            }
          }))
          
          if(page === 0) {
            setPokemons(pokemonDetails)
          } else {
            setPokemons(prev => prev ? [...prev, ...pokemonDetails] : pokemonDetails)
          }

        } catch(error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }

      }
    }}

    
    fetchPokemonList()
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
            <img src={pokemon.image} alt={pokemon.name} />
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
        {isLoading ? <li>Loading</li> : ""}
			</ul>

      {hasMore && (
        <button 
          onClick={loadMorePokemons}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
      
      {!hasMore && <p>No more Pokemon to load</p>}
		</div>
	)
}

export default Pokedex
