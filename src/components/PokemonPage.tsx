import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import PokemonDetailPage from './PokemonDetailPage'
import { useNavigate, useParams } from 'react-router'
import { usePokemonStore } from '../store/pokemonStore'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from '../styles/pokemonPage.module.css'
import { getPokemonData } from '../Api/getPokemonData'

export interface NamedAPIResource {
	name: string
	url: string
}

interface PokemonAbility {
	ability: NamedAPIResource
}

interface PokemonSprites {
	other: {
		dream_world: {
			front_default: string
		}
	}
}

export type PokemonStat = {
	stat: NamedAPIResource
	effort: number
	base_stat: number
}

export interface Pokemon {
	id: number
	name: string
	base_experience: number
	is_default: boolean
	abilities: PokemonAbility
	sprites: PokemonSprites
	species: NamedAPIResource
	stats: Array<PokemonStat>
}

type FlavorText = {
	flavor_text: string
	language: NamedAPIResource
	version: NamedAPIResource
}

interface PokemonSpecies {
	id: number
	is_legendary: boolean
	name: string
	flavor_text_entries: Array<FlavorText>
}
const PokemonPage = () => {
	const navigate = useNavigate()
	const { setLastPokemon, clearLastPokemon, addPlayerPokemon } = usePokemonStore()
	const { pokemon } = useParams<{ pokemon: string }>()
	const [pokemonData, setPokemon] = useState<Pokemon | null>(null)
	const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
		null,
	)
	const [isOpen, setIsOpen] = useState(false)

  const [isImageLoaded, setIsImageLoaded] = useState(false)

	const handleOpen = () => setIsOpen(true)

	useEffect(() => {
		if (pokemon) {
			setLastPokemon(pokemon)
			getPokemonData(pokemon)
        .then(el => setPokemon(el))
		}
	}, [pokemon, setLastPokemon])

	useEffect(() => {
		if (pokemonData?.species?.url) {

      setIsImageLoaded(false)

			fetch(pokemonData.species.url)
				.then(el => el.json())
				.then(el => {

          setPokemonSpecies(el)

          const img = new Image()
          img.src = pokemonData.sprites.other.dream_world.front_default
          img.decode().then(() => {setIsImageLoaded(true)})
        }
        )


		}
	}, [pokemonData])

	if (pokemonData === null) {
		return <p>Loading...</p>
	}
console.log(isImageLoaded ? 'y':'n')
	return (
		<>
			<button onClick={() => {
          clearLastPokemon()
          navigate('/pokedex')
      }}>Back</button>
      
			<div>Pokedex {pokemonData.id}</div>
			<div className='pokemon_page' id='pokemon_page'>
				<h1>{pokemonData.name}</h1>
				<p>Base exp. {pokemonData.base_experience}</p>

				{isImageLoaded ? <img src={pokemonData.sprites.other.dream_world.front_default} alt='' width={200} height={200}/> : <Skeleton 
          baseColor="#334155" 
          highlightColor="#475569" 
          className={styles['pokemon-img__skeleton']} 
        />  }
        
        
				<div>
					{pokemonSpecies ? (
						pokemonSpecies.flavor_text_entries
							.filter(
								descrip =>
									descrip.language.name === 'en' &&
									descrip.version.name === 'emerald',
							)
							.map(descrip => <li key={nanoid()}>{descrip.flavor_text}</li>)
					) : (
						<p>Loading description...</p>
					)}

          <button onClick={() => addPlayerPokemon({id: pokemonData.id, name: pokemonData.name})}>
            add pokemon
          </button>

					<button
						onClick={handleOpen}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
					>
						Open Drawer
					</button>
				</div>

				<PokemonDetailPage
					stats={pokemonData.stats}
					open={isOpen}
					onOpenChange={setIsOpen}
				/>
			</div>
		</>
	)
}

export default PokemonPage