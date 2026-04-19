// hooks/usePokemonPagination.ts
import { useState, useEffect } from 'react'
import { pokemonService } from '../Api/pokemonService'

interface PokemonListItem {
  image: string
  name: string
}

export const usePokemonPagination = (limit: number = 20) => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  const loadMore = () => setPage(prev => prev + 1)
  
  useEffect(() => {
    const fetchPage = async () => {
      if (isLoading || !hasMore) return
      
      setIsLoading(true)
      try {
        const offset = page * limit
        const result = await pokemonService.getPokemonPage(offset, limit)
        
        setPokemons(prev => page === 0 ? result.items : [...prev, ...result.items])
        setHasMore(result.hasNextPage)
      } catch (error) {
        console.error('Failed to load pokemon:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPage()
  }, [page, limit, hasMore, isLoading])
  
  return { pokemons, isLoading, hasMore, loadMore }
}