import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PokemonData {
  id: number
  name: string
}

interface PokemonStore {
	lastPokemon: string | null
	setLastPokemon: (pokemon: string) => void
	clearLastPokemon: () => void

  playerPokemons: PokemonData[],
  addPlayerPokemon: (pokemon: PokemonData) => void
}

export const usePokemonStore = create<PokemonStore>()(
	persist(
		set => ({
			lastPokemon: null,
      playerPokemons: [],

			setLastPokemon: pokemon => set({ lastPokemon: pokemon }),
			clearLastPokemon: () => set({ lastPokemon: null }),

      addPlayerPokemon: (pokemon) => set((state) => {

        const exist = state.playerPokemons.some(el => el.id === pokemon.id)
        if(exist) {
          console.log("you already have this pokemon")
          return state
        }

        return {
          playerPokemons: [...state.playerPokemons, pokemon]
        }

      })
		}),
		{
			name: 'pokemon-storage',
		},
	),
)
