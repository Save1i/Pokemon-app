import { nanoid } from "nanoid"
import type { PokemonStat } from "./PokemonPage"

type Props = {
  stats: Array<PokemonStat>
  setShowDetail: (value: boolean) => void
  showDetail: boolean
}

const PokemonDetailPage = ({stats, setShowDetail, showDetail}: Props) => {
  return (
    <div className="d-flex justify-content-center">
    <div className={`pokemon_detail ${showDetail ? 'active' : ''} container justify-content-center`}>
      <span className="cursor-pointer" onClick={() => {
            setShowDetail(false)
          }}>close</span>
      <div className="row g-3">
        {
          stats.map(pokemonStat => {
            return (
              <div className="col-6" key={nanoid()}>
                <div className="stat_item ">
                  <p>{pokemonStat.stat.name}</p>
                  <div className="d-flex align-items-center gap-3">
                    {pokemonStat.base_stat}
                    <div className="progress flex-grow-1" role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} style={{height: "6px"}}>
                      <div className="progress-bar" style={{width: `${pokemonStat.base_stat}%`}}></div>
                    </div>
                  </div>
                  
                  </div>
                </div>
            )
          })
        }
      </div>
    </div>
    </div>
  )
}

export default PokemonDetailPage