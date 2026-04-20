import { useEffect, useState } from "react";
import type { Pokemon } from "../components/PlayerPokemonLibrary";
import { usePokemonStore } from "../store/pokemonStore";
import { getPokemons } from "../Api/getPokemons";

interface UsePlayerPokemonsResult {
  playerPokemons: Pokemon[] | null
  loading: boolean
  isEmpty: boolean
}


export const usePlayerPokemons = (): UsePlayerPokemonsResult => {
  const playerPokemonsName = usePokemonStore(state => state.playerPokemons) as { id: number; name: string }[]

  const [loading, setLoading] = useState(false)
  const [playerPokemons, setPlayerPokemons] = useState<Pokemon[] | null>(null)
  
  useEffect(() => {
    if (!playerPokemonsName?.length) {
      setPlayerPokemons(null)
      return
    }

    let isMounted = true // Предотвращаем обновления после размонтирования

    const fetchPokemon = async () => {
      setLoading(true)

      try {
        const pokemonData = await getPokemons(playerPokemonsName)
        
        if (isMounted) {
          setPlayerPokemons(pokemonData)
        }
      } catch (error) {
        if (isMounted) {
          console.error(error)
          setPlayerPokemons(null)
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


  return {
    playerPokemons,
    loading,
    isEmpty: !playerPokemons?.length && playerPokemons !== null
  }

}
