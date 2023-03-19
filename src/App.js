
import './App.css';
import {useState } from 'react';
import Game from './Game';
import ReactCurvedText from 'react-curved-text'

function App() {
  
  
  const [started,setStarted] = useState(false)
  return (
    <div >
      {!started ? <div className="App">
        <img className='card2' src='https://deckofcardsapi.com/static/img/KH.png' alt='king' ></img>
        <div className='main'><ReactCurvedText width='600'
          height={300}
          cx='300'
          cy='246'
          rx='157'
          ry='145'
          startOffset='30 '
          reversed={true}
          text='High Low Card game'
          textProps={{"style": {"fontSize": "50"}}}
          textPathProps={{"fill": "#FFF"}}
          tspanProps={null}
          ellipseProps={null}
          svgProps={null} 
        /> 
  <button onClick={()=>{setStarted(true)}} className='started'>Start Game</button></div>
  <img className='card' src='https://deckofcardsapi.com/static/img/AS.png' alt='ace' ></img>
         </div>  
         : <Game />}
    </div>
  );
}

export default App;
