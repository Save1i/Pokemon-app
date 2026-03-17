import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PokemonStore {
	lastPokemon: string | null
	setLastPokemon: (pokemon: string) => void
	clearLastPokemon: () => void
}

export const usePokemonStore = create<PokemonStore>()(
	persist(
		set => ({
			lastPokemon: null,
			setLastPokemon: pokemon => set({ lastPokemon: pokemon }),
			clearLastPokemon: () => set({ lastPokemon: null }),
		}),
		{
			name: 'pokemon-storage',
		},
	),
)
