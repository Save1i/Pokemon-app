// PlayerPokemonLibrary.tsx
import { useEffect, useState, useCallback } from 'react'
import { usePokemonStore } from '../store/pokemonStore'
import { getPokemons } from '../Api/getPokemons'

interface Pokemon {
  id: number
  name: string
  image: string
}

const PlayerPokemonLibrary = () => {
  const playerPokemonsName = usePokemonStore(state => state.playerPokemons) as { id: number; name: string }[]
  const { removeAllPlayserPokemon } = usePokemonStore()

  const [loading, setLoading] = useState(false)
  const [playerPokemons, setPlayerPokemons] = useState<Pokemon[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!playerPokemonsName?.length) {
      setPlayerPokemons(null)
      return
    }

    let isMounted = true // Предотвращаем обновления после размонтирования

    const fetchPokemon = async () => {
      setLoading(true)
      setError(null)

      try {
        const pokemonData = await getPokemons(playerPokemonsName)
        
        if (isMounted) {
          setPlayerPokemons(pokemonData)
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Unknown error')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPokemon()
    
    return () => {
      isMounted = false
    }
  }, [playerPokemonsName])

  const removeAllPokemons = useCallback(() => {
    if (confirm("Are you sure?")) {
      removeAllPlayserPokemon()
    }
  }, [removeAllPlayserPokemon])

  // Ранние возвраты
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!playerPokemons?.length) return <p>Your library is empty</p>

  return (
    <div>
      {playerPokemons.map(pokemon => (
        <div key={pokemon.id}>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}

      <button onClick={removeAllPokemons}>
        Remove All Pokemons
      </button>
    </div>
  )
}

export default PlayerPokemonLibrary