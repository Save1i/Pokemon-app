// Api/getPokemon.ts
interface PokemonNameItem {
  id: number
  name: string
}

interface Pokemon {
  id: number
  name: string
  image: string
  sprites?: {
    front_default: string
  }
}

export const getPokemon = async(playerPokemonsName: PokemonNameItem[]): Promise<Pokemon[]> => {
  // Добавляем return!
  return await Promise.all(
    playerPokemonsName.map(async (el) => {
      const detailResource = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${el.id}`
      )
      const pokemonData = await detailResource.json()

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites?.front_default || '',
        sprites: pokemonData.sprites,
      }
    })
  )
}