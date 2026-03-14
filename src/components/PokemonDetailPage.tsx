import { nanoid } from "nanoid"
import type { PokemonStat } from "./PokemonPage"

type Props = {
  stats: Array<PokemonStat>
}

const PokemonDetailPage = ({stats}: Props) => {
  return (
    <div className="row g-3">
      {
        stats.map(pokemonStat => {
          return (
            <div className="col-6" key={nanoid()}>
              <div className="stat_item ">
                <p>{pokemonStat.stat.name}</p>
                <div>
                  <span>{pokemonStat.base_stat}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PokemonDetailPage