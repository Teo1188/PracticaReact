import { useState, useEffect } from 'react'

export default function CharacterSearch() {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getCharacters(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  function getCharacters(page = 1, name = '') {
    const url = name 
      ? `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}` 
      : `https://rickandmortyapi.com/api/character/?page=${page}`
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results)
        setTotalPages(data.info.pages)
      })
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="busqueda w-full flex flex-col items-center">
      <main className="mt-4 w-full max-w-7xl px-4 flex flex-col items-center">
        <h1 className="text-6xl text-cyan-400 font-handrawn text-shadow-lg shadow-yellow-400 animate-pulse text-center mt-10 mb-10">
          Rick and Morty<br />Search
        </h1>
        
        <input 
          id="txt-character" 
          className="w-full md:w-96 h-12 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 font-handrawn focus:outline-none focus:ring-2 focus:ring-cyan-400" 
          autoComplete="off" 
          type="text" 
          placeholder="Type your character"
          value={searchTerm}
          onChange={handleSearch}
        />
        
        <div id="containerCards" className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map(character => (
            <div key={character.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex">
              <img src={character.image} alt={character.name} className="w-1/2" />
              <div className="p-4 w-1/2">
                <h2 className="text-xl font-bold text-yellow-400">{character.name}</h2>
                <p className="text-white">Gender: {character.gender}</p>
                <p className="text-white">Status: {character.status}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div id="pagination" className="mt-6 flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 ${currentPage === page ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-full`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}