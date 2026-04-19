export const getPokemonData = (pokemon: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
				.then(el => el.json())
}