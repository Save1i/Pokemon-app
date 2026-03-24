import { usePokemonStore } from "../store/pokemonStore"

const PlayerPokemonLibrary = () => {
	const playerPokemons = usePokemonStore(state => state.playerPokemons)
	
	if (playerPokemons.length === 0) {
		return <p>You library is empty</p>
	}
		return (
			<div>
				{playerPokemons.map(el => (
					<p>{el.name}</p>
				))}
			</div>
		)
}

export default PlayerPokemonLibrary
