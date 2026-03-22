import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PokemonData {
  id: number
  name: string
}

interface PokemonStore {
	lastPokemon: string | null
	setLastPokemon: (pokemon: string) => void
	clearLastPokemon: () => void

  myPokemons: PokemonData[],
  addPokemon: (pokemon: PokemonData) => void
}

export const usePokemonStore = create<PokemonStore>()(
	persist(
		set => ({
			lastPokemon: null,
      myPokemons: [],

			setLastPokemon: pokemon => set({ lastPokemon: pokemon }),
			clearLastPokemon: () => set({ lastPokemon: null }),

      addPokemon: (pokemon) => set((state) => {

        const exist = state.myPokemons.some(el => el.id === pokemon.id)
        if(exist) {
          console.log("you already have this pokemon")
          return state
        }

        return {
          myPokemons: [...state.myPokemons, pokemon]
        }

      })
		}),
		{
			name: 'pokemon-storage',
		},
	),
)
