import type { NamedAPIResource } from "../components/PokemonPage"


interface Named {
	count: number
	next: string
	previous?: string
	results: Array<NamedAPIResource>
}

export const PokemonsPaging = async(offset: number, limit: number) => {
  const pokemonsName = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)

  const data: Named = await pokemonsName.json()

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

  return {
    data,
    pokemonDetails
  }
}