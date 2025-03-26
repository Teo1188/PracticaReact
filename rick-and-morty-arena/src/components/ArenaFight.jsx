import { useState, useEffect, useRef } from 'react'

export default function ArenaFight() {
  const [characters, setCharacters] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedCharacters, setLikedCharacters] = useState([])
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [battleView, setBattleView] = useState(null)
  const [winner, setWinner] = useState(null)
  const cardContainerRef = useRef(null)

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  function displayCharacter() {
    if (currentIndex >= characters.length) {
      return <p className='text-xl text-white'>No more characters!</p>
    }

    const character = characters[currentIndex]
    return (
      <div className={`swipe-animation absolute inset-0 ${swipeDirection === 'like' ? 'swipe-like' : swipeDirection === 'dislike' ? 'swipe-dislike' : ''}`}>
        <img src={character.image} alt={character.name} className="w-full h-3/4 object-cover rounded-t-2xl" />
        <div className="p-4">
          <h2 className="text-blue-500 text-xl font-semibold">{character.name}</h2>
          <p className="text-gray-400">{character.species}</p>
          <p className="text-gray-400">{character.status}</p>
        </div>
      </div>
    )
  }

  function swipe(direction) {
    setSwipeDirection(direction)
    
    setTimeout(() => {
      if (direction === "like") {
        setLikedCharacters([...likedCharacters, characters[currentIndex]])
      }
      setCurrentIndex(currentIndex + 1)
      setSwipeDirection(null)
    }, 500)
  }

  function startBattle() {
    if (likedCharacters.length < 2) {
      alert("Add at least two characters to start a battle!");
      return;
    }
    
    const fighter1 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
    let fighter2 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
    
    while (fighter1 === fighter2) {
      fighter2 = likedCharacters[Math.floor(Math.random() * likedCharacters.length)];
    }
  
    setBattleView(
      <div className="battle-animation">
        <div className="fighter text-center" id="fighter1">
          <img 
            src={fighter1.image} 
            alt={fighter1.name} 
            className="rounded-full w-32 h-32 object-cover border-4 border-yellow-400 shadow-lg" 
          />
          <p className="text-white mt-2 font-semibold">{fighter1.name}</p>
        </div>
        <p className="text-4xl mx-8 mb-16 z-0">⚔️</p>
        <div className="fighter text-center" id="fighter2">
          <img 
            src={fighter2.image} 
            alt={fighter2.name} 
            className="rounded-full w-32 h-32 object-cover border-4 border-yellow-400 shadow-lg" 
          />
          <p className="text-white mt-2 font-semibold">{fighter2.name}</p>
        </div>
      </div>
    );
  
    // Tiempo antes de que comience la animación (2 segundos)
    setTimeout(() => {
      const winnerIndex = Math.random() > 0.5 ? 0 : 1;
      const loserIndex = winnerIndex === 0 ? 1 : 0;
      const fighters = cardContainerRef.current.querySelectorAll('.fighter');
      
      // Aplicar estilos de victoria/derrota
      fighters[winnerIndex].classList.add('victory');
      fighters[loserIndex].classList.add('defeat');
      
      // Tiempo antes de mostrar el mensaje de victoria (2 segundos después de que comienza la animación)
      setTimeout(() => {
        const winnerName = winnerIndex === 0 ? fighter1.name : fighter2.name;
        setWinner(winnerName);
        
        const victoryMessage = (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="bg-black bg-opacity-70 p-6 rounded-xl text-center">
              <h3 className="text-3xl text-yellow-400 font-bold mb-2">¡VICTORIA!</h3>
              <p className="text-2xl text-white">{winnerName} gana la batalla!</p>
            </div>
          </div>
        );
        
        setBattleView(prev => (
          <>
            {prev}
            {victoryMessage}
          </>
        ));
        
        // Tiempo antes de reiniciar (3 segundos después del mensaje)
        setTimeout(() => {
          setBattleView(null);
          setWinner(null);
        }, 3000);
      }, 2000); // Aumentado de 1s a 2s para la animación
    }, 2000); // Aumentado de 1s a 2s antes de comenzar la animación
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="relative w-full h-96 flex items-center justify-center">
          <p className="text-white">Loading characters...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ArenaFight text-center mt-10 mb-10">
      <div className="w-full max-w-md text-center">
        <h1 className="text-6xl text-cyan-400 font-handrawn text-shadow-lg shadow-yellow-400 animate-pulse mt-10 mb-10">
          Rick and Morty<br />ArenaFight!
        </h1>
        
              <div
                  ref={cardContainerRef}
                  className="relative w-full h-[32rem] overflow-visible rounded-2xl shadow-lg bg-gray-800 flex items-center justify-center p-4"
              >
                  {battleView || (currentIndex < characters.length ? displayCharacter() :
                      <p className="text-white">No more characters to show</p>
                  )}
              </div>
        
        <div className="mt-6 space-x-4">
          <button 
            onClick={() => swipe("dislike")} 
            className="bg-red-500 px-6 py-2 rounded-lg shadow-lg hover:bg-red-600"
            disabled={currentIndex >= characters.length}
          >
            Dislike
          </button>
          <button 
            onClick={() => swipe("like")} 
            className="bg-green-500 px-6 py-2 rounded-lg shadow-lg hover:bg-green-600"
            disabled={currentIndex >= characters.length}
          >
            Like
          </button>
          <button 
            onClick={startBattle} 
            className="bg-blue-500 px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Battle
          </button>
        </div>
        
        <div className="mt-10">
          <h2 className="text-green-600 text-2xl mb-4">Liked Characters</h2>
          <ul id="liked-list" className="space-y-2 text-left">
            {likedCharacters.map((character, index) => (
              <li key={index} className="text-green-400">{character.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}