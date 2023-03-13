
import './App.css';
import {useState } from 'react';
import Game from './Game';


function App() {
  
  
  const [started,setStarted] = useState(false)
  return (
    <div >
      {!started ? <div className="App"> High Low Card game <button onClick={()=>{setStarted(true)}} className='started'>Start Game</button> </div>  : <Game />}
    </div>
  );
}

export default App;
