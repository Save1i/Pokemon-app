import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'

import { NavLink, useNavigate } from 'react-router'
import { usePokemonStore } from '../store/pokemonStore'
import { PokemonsPaging } from '../Api/pokemonsPaging'

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

          const pokemonDetails = await PokemonsPaging(offset, limitOfRender.current);
          setHasMore(!!pokemonDetails.data.next)
          
          if(page === 0) {
            setPokemons(pokemonDetails.pokemonDetails)
          } else {
            setPokemons(prev => prev ? [...prev, ...pokemonDetails.pokemonDetails] : pokemonDetails.pokemonDetails)
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
