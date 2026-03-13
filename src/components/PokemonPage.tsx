import { nanoid } from "nanoid"
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



type FlavorText = {
  flavor_text: string,
  language: NamedAPIResource,
  version: NamedAPIResource
}

interface PokemonSpecies {
  id: number,
  is_legendary: boolean,
  name: string,
  flavor_text_entries: Array<FlavorText>
}

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [pokemonSpecies , setPokemonSpecies] = useState<PokemonSpecies | null>(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((el) =>el.json())
      .then((el) => setPokemon(el))
  }, [])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/pikachu')
      .then((el) =>el.json())
      .then((el) => setPokemonSpecies(el))
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
        
        <span>
          {
            pokemonSpecies ?
              pokemonSpecies.flavor_text_entries.map((descrip) => {
                if(descrip.language.name === 'en' && descrip.version.name === 'emerald') {
                  return <li key={nanoid()}>{descrip.flavor_text}</li>
                }
              } )
             : <p>...</p>
          
          }
        </span>
      </div>
    </>
    
  )
}

export default PokemonPage