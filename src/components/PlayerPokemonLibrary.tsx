import { useEffect, useState } from "react"
import { usePokemonStore } from "../store/pokemonStore"
import type { Pokemon } from "./PokemonPage"
import { nanoid } from "nanoid"

const PlayerPokemonLibrary = () => {
	const playerPokemons = usePokemonStore(state => state.playerPokemons)
  const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null)
	
	if (playerPokemons.length === 0) {
		return <p>You library is empty</p>
	}

  useEffect(() => {



    const myPokemon = async() => {
      try {
        const playerLibrary = await Promise.all(playerPokemons.map( async (pokemon) => {
          const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
          const detailData = await detailResponse.json()

          console.log(detailData)

          return detailData
        }))

          setPokemonData(playerLibrary)

      } catch(error) {
        console.log(error)
      }



    }

    
      myPokemon()
  }, [])

		return (
			<div>
			{
        pokemonData ?
        pokemonData.map(el => (
					<p key={nanoid()}>{el.name}</p>
				)) : <p>nothing</p>
      
      }
			</div>
		)
}

export default PlayerPokemonLibrary
