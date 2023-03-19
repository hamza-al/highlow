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
    const [ans,setAns] = useState('')


    // URL to fetch deck from API
    let baseURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    //To change player, the score of the active player is incremented by how 
    //ever many cards are in the pile, the pile is reset to zero, then the player is changed
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
    //Before the game begins, the deck is fetched from the API adn shuffled, and the first card is drawn for player one to base their guess off of
    useEffect(() => {
    async function getDeck() {
      const response = await axios.get(baseURL)
      setDeck(old => response.data)
    }
     getDeck()    
  }, 
  [baseURL]);
 useEffect(() => {
    async function getCard() {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
      setCard(await response.data['cards'][0])
      
      console.log(await response.data['cards'])
      setDrawn(oldState=>oldState+1)
      
    }
     getCard()    
  }, 
  [deck]);


  //Game is to be displayed while less than 52 cards are drawn.
  if(drawn < 52){
    return (<div className='game'>
      <div className='header'>

        {/* The score of each player, the title, and how many cards are remaininjg before the game ends are displayed on top of the game page */}
        <div> P1 score: {scoreOne} <br></br> P2 score: {scoreTwo} </div>
        <div>high low card game <br></br>
            Cards remaining: {52 - drawn}
        </div>

        <div> P{player ? '1' : '2'}'s turn <br></br> Pile size: {pile}</div>
      </div>

      {/* The deck of cards and the active card the guess is to be compared to displayed side by side */}
      <div className='cards'>
        <img className='deck' src={card['image']} alt='card'></img>

        <img src={'https://deckofcardsapi.com/static/img/back.png'} alt='card'></img>
      </div>

        {/* Buttons to guess higher or lower are constant on the screen, but the pass button only appears if the player 
         makes 3 consecutive correct guesses*/}
        <div className='buttons'>
        <button className='button' onClick={async ()=>{

          // Button to guess higher. Guessing draws a card, compares drawn card to active card, increments pile by 1 if correct, ends turn if wrong.
          //Sets drawn card as active card
          setDrawn(oldState => oldState + 1)
            
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
            setCard(await response.data['cards'][0])
            let x = await response.data['cards'][0]['value']
            let y = card['value']
            if(values[x] > values[y]){
              setAns('CORRECT')
              setPile(oldState => oldState+1)
            
              console.log(pile)
              
            }
            else{
              setAns('WRONG')
              changePlayer()
            }
        }}>
                higher
            </button>
            {
              //Button to pass. Passing only switches turns. Does not draw a card. If the pile size is less than 3, this button will not be shown.
              pile >= 3 ? <button onClick={()=>{
                setAns('')
                changePlayer()}
              } className='button'> Pass</button> : null
            }
            <button className='button' onClick={async ()=>{
              //Button to guess lower.
              setDrawn(oldState => oldState + 1)
              const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
              setCard(await response.data['cards'][0])
              let x = await response.data['cards'][0]['value']
              let y = card['value']
              if(values[x] < values[y]){
                setAns('CORRECT')
                setPile(oldState => oldState+1)
                
                console.log(pile)
                
              }
              else{
                setAns('WRONG')
                changePlayer()
              }

            }}>
                lower
            </button>
            </div>
          <div>
            {ans}
          </div>
    </div>)
  } 
  else{
    //If 52 cards have been drawn, game ends, and scoreboard shows
    if(inGame){
      return <div className='game end'>
      Game Over <br></br>
      Player {scoreOne > scoreTwo ? '1' : '2'} wins with {scoreOne > scoreTwo ? scoreOne : scoreTwo} points vs {scoreOne > scoreTwo ? scoreTwo : scoreOne} points
      
      {/* button to reset game to start screen */}
      <button className='button2' onClick={()=>{setIngame(false)}}>Play Again</button>
      </div>
    }
    else{
      return <App />
    }
    
  }

}

export default Game