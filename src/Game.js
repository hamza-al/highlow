import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.css';


function Game() {
    const [deck, setDeck] = useState('')
    const [card,setCard] = useState('')
    let baseURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    useEffect(() => {
    async function getDeck() {
      const responce = await axios.get(baseURL)
      setDeck(responce.data)
    }
    getDeck()
  }, 
  [baseURL]);


  useEffect(() => {
    async function getCard() {
      const responce = await  axios.get(`https://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
      setCard(responce.data['cards'][0]['image'])
    }
    getCard()
  }, 
  [deck]);
 

  return (
    <div className='game'>

        <div className='buttons'>
        <button className='button' onClick={()=>{
                console.log(deck)
            }}>
                high
            </button>
            <img src={card}></img>

                
        
            
            <button className='button' onClick={()=>{
                console.log(deck)
            }}>
                low
            </button>

            </div>

    </div>
   
  )
}

export default Game