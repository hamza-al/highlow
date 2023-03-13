
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  let baseURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const [deck, setDeck] = useState('')
  useEffect(() => {
    
    // React advises to declare the async function directly inside useEffect
    async function getDeck() {
      const responce = await axios.get(baseURL)
      console.log(responce)
      setDeck(responce.data)
    }
    getDeck()
  
  }, [baseURL]);

  return (
    <div className="App">
      High Low Card game
    </div>
  );
}

export default App;
