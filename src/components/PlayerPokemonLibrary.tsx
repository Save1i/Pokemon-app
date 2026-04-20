// PlayerPokemonLibrary.tsx
import { useCallback } from 'react'
import { usePokemonStore } from '../store/pokemonStore'
import { usePlayerPokemons } from '../hooks/usePlayerPokemons'

export interface Pokemon {
  id: number
  name: string
  image: string
}

const PlayerPokemonLibrary = () => {
  const { removeAllPlayserPokemon } = usePokemonStore()
  const {playerPokemons, loading, isEmpty} = usePlayerPokemons()

  const removeAllPokemons = useCallback(() => {
    if (confirm("Are you sure?")) {
      removeAllPlayserPokemon()
    }
  }, [removeAllPlayserPokemon])

  if (loading) return <p>Loading...</p>
  if (isEmpty) return <p>Your library is empty</p>

  return (
    <div>
      {playerPokemons?.map(pokemon => (
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