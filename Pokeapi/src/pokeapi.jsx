import React, { useEffect, useState } from 'react';

const PokeDex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    const newPokemonList = [];
    for (let i = 1; i <= 1304; i++) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = await response.json();

        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();
        const description = speciesData.flavor_text_entries
          .find((entry) => entry.language.name === "es")
          .flavor_text.replace(/\f/g, " ");

        newPokemonList.push({
          ...pokemon,
          description,
        });
      } catch (error) {
        console.error("Error al obtener Pokemon:" + error);
      }
    }
    setPokemonList(newPokemonList);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-white mb-6">POKEDEX</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        className="border p-3 w-full max-w-md mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-lg shadow-lg p-4 text-center hover:scale-105 transition transform duration-300"
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-32 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h2>
            <p className="text-gray-700">Peso: {pokemon.weight}</p>
            <p className="text-gray-700">Altura: {pokemon.height}</p>
            <p className="text-gray-700">Ataque: {pokemon.stats[1].base_stat}</p>
            <p className="text-gray-700">Defensa: {pokemon.stats[2].base_stat}</p>
            <div className="mt-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="bg-yellow-100 text-yellow-700 px-2 rounded mx-1"
                >
                  {type.type.name.toUpperCase()}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-4">{pokemon.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeDex;