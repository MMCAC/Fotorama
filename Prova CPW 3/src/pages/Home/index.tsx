import { useEffect, useState, useContext } from 'react'

import styles from './styles.module.css'
import { Photo } from '../../models/Photo'
import { searchPhotos } from '../../services/PhotoService'
import { PacmanLoader } from 'react-spinners'
import ResultCard from '../../components/ResultCard'
import searchIcon from '../../assets/img/search.png'
import { UserContext } from '../../context/UserContext'

const Home = () => {
  const [loading, isLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [newSearch, isNewSearch] = useState(false)

  const { lastResult, setLastResult, query, setQuery, orderByCriteria, setOrderByCriteria, filterByOrientation, setFilterByOrientation } = useContext(UserContext)

  const searchResults = async () => {
    if (query.trim()) {
      console.log('Entrou')
      isLoading(true)
      setLastResult({
        photos: [],
        totalPages: 0,
      })
      const searchResult = await searchPhotos(query, orderByCriteria, page, filterByOrientation)
      console.log(searchResult)
      setLastResult(searchResult)
      isLoading(false)
    }
  }

  useEffect(() => {
    console.log('Entrou no useEffect 1')
    searchResults()
  }, [page])

  useEffect(() => {
    if (newSearch) {
      console.log('Entrou no useEffect 2')
      setPage(1)
      searchResults()
      isNewSearch(false)
    }
  }, [newSearch])

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type='text'
          className={styles.searchInput}
        />
        <button
          onClick={() => isNewSearch(true)}
          className={styles.searchButton}
        >
          Pesquisar
        </button>

        <button
          onClick={() => isNewSearch(true)}
          className={styles.responsiveSearchButton}
        >
          <img src={searchIcon} alt='Pesquisar' />
        </button>

        <select name='importancia' className={styles.filters} onChange={(e) => setOrderByCriteria(e.target.value)}>
          <option value="undefined"> </option>
          <option value="relevant">Relevante</option>
          <option value="">Mais recentes</option>
        </select>

        <select name="orientacao" className={styles.filters} onChange={(e) => setFilterByOrientation(e.target.value)}>
          <option value="undefined"> </option>
          <option value="landscape">Paisagem</option>
          <option value="portrait">Retrato</option>
        </select>

        
      </div>

      <PacmanLoader color='#fff' loading={loading} />

      {!loading && lastResult.photos.length > 0 && (
        <>
          <div className={styles.resultsArea}>
            {lastResult.photos.map((p: Photo) => (
              <ResultCard key={p.id} photo={p} />
            ))}
          </div>

          <div>
            {page > 1 && (
              <button
                className={styles.pageButton}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </button>
            )}
            <span className={styles.currentPageLabel}>
              Página {page} de {lastResult.totalPages}
            </span>
            {page < lastResult.totalPages && (
              <button
                className={styles.pageButton}
                onClick={() => setPage(page + 1)}
              >
                Próxima
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
