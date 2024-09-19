import PokemonList from './components/PokemonList';
import PokemonProvider from './context/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <h1>Pokédex</h1>
        <PokemonList />
      </div>
    </PokemonProvider>
  );
}

export default App;
