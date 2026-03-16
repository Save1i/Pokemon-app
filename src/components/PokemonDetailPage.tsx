import { nanoid } from "nanoid"
import type { PokemonStat } from "./PokemonPage"
import { Drawer } from "vaul"

type Props = {
	stats: Array<PokemonStat>
	open: boolean
	onOpenChange: (open: boolean) => void
}

const PokemonDetailPage = ({
	stats,
	open,
	onOpenChange,
}: Props) => {
	return (
		<Drawer.Root
			open={open}
			onOpenChange={onOpenChange}
			container={document.getElementById('pokemon_page')}
		>
			<Drawer.Portal>
				<Drawer.Overlay
					style={{
						position: 'fixed',
						inset: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.1)',
						zIndex: 1040,
					}}
				/>
				<Drawer.Content
					style={{
						height: 'fit-content',
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
						outline: 'none',
						zIndex: 1045,
					}}
				>

					<div className='d-flex justify-content-center'>
						<div
							className={`pokemon_detail container justify-content-center py-5`}
						>
							<div className='row g-3'>
								{stats.map(pokemonStat => {
									return (
										<div className='col-6' key={nanoid()}>
											<div className='stat_item '>
												<p>{pokemonStat.stat.name}</p>
												<div className='d-flex align-items-center gap-3'>
													{pokemonStat.base_stat}
													<div
														className='progress flex-grow-1'
														role='progressbar'
														aria-label='Basic example'
														aria-valuenow={0}
														aria-valuemin={0}
														aria-valuemax={100}
														style={{ height: '6px' }}
													>
														<div
															className='progress-bar'
															style={{ width: `${pokemonStat.base_stat}%` }}
														></div>
													</div>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	)
}

export default PokemonDetailPage