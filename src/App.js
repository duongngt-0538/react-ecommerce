import './App.css';
import Filters from './components/Filters/Filters';
import ResultsContainer from './components/Results/ResultsContainer';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div>
      <SearchBar />
      <div className="container">
        <Filters />
        <ResultsContainer />
      </div>
    </div>
  );
}

export default App;
