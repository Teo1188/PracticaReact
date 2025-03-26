import Header from './components/Header'
import ArenaFight from './components/ArenaFight'
import CharacterSearch from './components/CharacterSearch'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-col items-center min-h-screen">
      <Header />
      <ArenaFight />
      <hr className="my-4 w-11/12 border-gray-600" />
      <CharacterSearch />
      <Footer />
    </div>
  )
}

export default App
