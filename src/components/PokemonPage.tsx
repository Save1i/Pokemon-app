import { useEffect, useState } from "react"

interface NamedAPIResource {
  name: string,
  url: string
}

interface PokemonAbility {
  ability: NamedAPIResource
}

interface Pokemon {
  id: number,
  name: string,
  base_experience: number,
  is_default: boolean,
  abilities: PokemonAbility,

}

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((el) =>el.json())
      .then((el) => setPokemon(el))
  }, [])

  if(pokemon === null) {
    return <p>You don`t have any pokemons</p>
  }

  return (
    <>
      <div>Pokedex {pokemon.id}</div>
      <div>
        <h1>{pokemon.name}</h1>
        <p>Base exp. {pokemon.base_experience}</p>
      </div>
    </>
    
  )
}

export default PokemonPage