import React from 'react';
import { MembraneSynth } from "tone"

// Create Synths
const Memsynth = new MembraneSynth().toDestination();

export default function MpcButton() {
  const handleClick = () => {
    Memsynth.triggerAttackRelease("C4", "8n");
  }

  return (
    <div className = 'button-container'>
      <div className = 'button' onClick={()=> {handleClick()}} />
    </div>
  )
}
