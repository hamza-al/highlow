import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.css';
import App from './App';


function Game() {

    

    //Equivilencies between card values in the API response and their numerical values
    let values = {
      'ACE':14,
      '2':2,
      '3':3,
      '4':4,
      '5':5,
      '6':6,
      '7':7,
      '8':8,
      '9':9,
      '10':10,
      'JACK':11,
      'QUEEN':12,
      'KING':13
    }
    // Variables for managing the deck and cards
    const [deck, setDeck] = useState('')
    const [card,setCard] = useState('ok')
    const [pile,setPile] = useState(0)


    // Variables for game and score

    const [player,setPlayer] = useState(true)
    const [scoreOne,setScoreOne] = useState(0)
    const [scoreTwo,setScoreTwo] = useState(0)
    const [inGame,setIngame] = useState(true)
    
    
    const [drawn,setDrawn] = useState(0)

    let baseURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    function changePlayer(){
      if(player){
        setScoreOne(oldState=> oldState + pile)
        setPile(0)
        setPlayer(false)
        
      }
      else{
        setScoreTwo(oldState=> oldState + pile)
        setPile(0)
        setPlayer(true)
        
      }

    }

    useEffect(() => {
    async function getDeck() {
      const responce = await axios.get(baseURL)
      setDeck(old => responce.data)
    }
     getDeck()    
  }, 
  [baseURL]);
 useEffect(() => {
    async function getCard() {
      const responce = await axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
      setCard(await responce.data['cards'][0])
      
      console.log(await responce.data['cards'])
      setDrawn(oldState=>oldState+1)
      
    }
     getCard()    
  }, 
  [deck]);

  if(drawn < 52){
    return (<div className='game'>
      <div className='header'>
        <div> P1 score: {scoreOne} <br></br> P2 score: {scoreTwo} </div>
        <div>high low card game</div>
        <div> P{player ? '1' : '2'}'s turn <br></br> Pile size: {pile}</div>
      </div>
      <div className='cards'>
        <img className='deck' src={card['image']} alt='card'></img>

        <img src={'https://deckofcardsapi.com/static/img/back.png'} alt='card'></img>
      </div>
      
        <div className='buttons'>
        <button className='button' onClick={async ()=>{
          setDrawn(oldState => oldState + 1)
            
            const responce = await axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
            setCard(await responce.data['cards'][0])
            let x = await responce.data['cards'][0]['value']
            let y = card['value']
            if(values[x] > values[y]){
              setPile(oldState => oldState+1)
              console.log(pile)
              
            }
            else{
              console.log('switch')
              changePlayer()
            }
        }}>
                higher
            </button>
            {
              pile >= 3 ? <button onClick={()=>{changePlayer()}} className='button'> Pass</button> : null
            }
            <button className='button' onClick={async ()=>{
              setDrawn(oldState => oldState + 1)
              const responce = await axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
              setCard(await responce.data['cards'][0])
              let x = await responce.data['cards'][0]['value']
              let y = card['value']
              if(values[x] < values[y]){
                setPile(oldState => oldState+1)
                console.log(pile)
                
              }
              else{
                console.log('switch')
                changePlayer()
              }

            }}>
                lower
            </button>
            </div>
    </div>)
  } 
  else{
    console.log('done')
    if(inGame){
      return <div className='game end'>
      Game Over <br></br>
      Player {scoreOne > scoreTwo ? '1' : '2'} wins with {scoreOne > scoreTwo ? scoreOne : scoreTwo} points vs {scoreOne > scoreTwo ? scoreTwo : scoreOne} points
      <button className='button2' onClick={()=>{setIngame(false)}}>Play Again</button>
      </div>
    }
    else{
      return <App />
    }
    
  }

}

export default Game