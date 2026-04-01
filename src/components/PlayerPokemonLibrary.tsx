import { useEffect, useState } from 'react'
import { usePokemonStore } from '../store/pokemonStore'

interface Pokemon {
	id: number // добавляем id для key
	name: string
	image: string
	sprites?: {
		front_default: string
	}
}

interface PokemonNameItem {
	id: number
	name: string
}

const PlayerPokemonLibrary = () => {
	const playerPokemonsName = usePokemonStore(
		state => state.playerPokemons,
	) as PokemonNameItem[]

  const {removeAllPlayserPokemon} = usePokemonStore()

	const [loading, setLoading] = useState(false)
	const [playerPokemons, setPlayerPokemons] = useState<Pokemon[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Если нет покемонов, сбрасываем
		if (!playerPokemonsName || playerPokemonsName.length === 0) {
			setPlayerPokemons(null)
			return
		}

		const fetchPokemon = async () => {
			setLoading(true)
			setError(null)

			try {
				const pokemonData = await Promise.all(
					playerPokemonsName.map(async el => {
						const detailResource = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${el.id}`)

						const pokemonData = await detailResource.json()

						return {
							id: pokemonData.id,
							name: pokemonData.name,
							image: pokemonData.sprites?.front_default || '',
							sprites: pokemonData.sprites,
						}
					}),
				)

				setPlayerPokemons(pokemonData)
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching pokemons:', error)
					setError(error.message)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchPokemon()
	}, [playerPokemonsName])

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	if (playerPokemons === null || playerPokemons.length === 0) {
		return <p>Your library is empty</p>
	}

	return (
		<div>
			{playerPokemons.map(el => (
				<div>
					<img src={el.image} alt="" />
					<p key={el.id}>{el.name}</p>
				</div>
			))}

      <button onClick={() => {
        removeAllPlayserPokemon()
      }}>Remove Pokemons</button>
		</div>
	)
}

export default PlayerPokemonLibrary
