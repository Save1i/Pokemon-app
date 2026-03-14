import type { PokemonStat } from "./PokemonPage"

type Props = {
  stats: Array<PokemonStat>
}

const PokemonDetailPage = ({stats}: Props) => {
  return (
    <div className="row">
      {
        stats.map(pokemonStat => {
          return (
            <div className="col-6" >
              <p>{pokemonStat.stat.name}</p>
              <div>
                <span>{pokemonStat.base_stat}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PokemonDetailPage