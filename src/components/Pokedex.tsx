import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

import { NavLink } from 'react-router'
import { usePokemonStore } from '../store/pokemonStore'
import type { NamedAPIResource } from './PokemonPage'

interface Named {
	count: number
	next: string
	previous?: string
	results: Array<NamedAPIResource>
}

const Pokedex = () => {
	const { lastPokemon } = usePokemonStore()
	const [pokemons, setPokemons] = useState<Named | null>(null)

	// Всегда загружаем список покемонов
	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
			.then(el => el.json())
			.then(el => setPokemons(el))
	}, [])

	if (pokemons === null) {
		return <p>Loading...</p>
	}

	return (
		<div>
			{/* Показываем информацию о последнем покемоне, но не редиректим */}
			{lastPokemon && (
				<div
					style={{
						marginBottom: '20px',
						padding: '10px',
						background: '#f0f0f0',
						borderRadius: '5px',
					}}
				>
					<p>
						Last viewed: <strong>{lastPokemon}</strong>
					</p>
					<NavLink
						to={`/pokedex/${lastPokemon}`}
						className='btn btn-primary'
						style={{ marginRight: '10px' }}
					>
						Back to {lastPokemon}
					</NavLink>

					{/* Добавляем кнопку для сброса */}
					<button
						onClick={() => {
							localStorage.removeItem('pokemon-storage')
							window.location.reload()
						}}
						className='btn btn-secondary'
					>
						Show all pokemons
					</button>
				</div>
			)}

			<ul>
				{pokemons.results.map(pokemon => (
					<li key={nanoid()}>
						<NavLink
							to={`/pokedex/${pokemon.name}`}
							className={({ isActive }) =>
								isActive ? 'active-link fw-bold' : ''
							}
						>
							{pokemon.name}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Pokedex
