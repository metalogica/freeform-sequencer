import React, { useState } from 'react';
import { MembraneSynth, MetalSynth } from "tone"

const Memsynth = new MembraneSynth().toDestination();
const MetSynth = new MetalSynth().toDestination();

function MpcButton() {
  let t0 = 0;
  let t1 = 0;

  const [synth, setSynth] = useState(Memsynth)
  const [tone, setTone] = useState("C4")


  const handleMouseDown = () => {
    synth.triggerAttackRelease(tone, "8n");

    t0 = performance.now();
  }

  const handleMouseUp = () => {
    t1 = performance.now();

    if ( t1 - t0 > 500 ) {
      setSynth(MetSynth)
    }
  }

  return (
    <div className = 'mpc-button' onMouseDown={()=> {handleMouseDown()}} onMouseUp={()=>{handleMouseUp()}}/>
  )
}

export default function MpcButtons() {
  return (
    <div className = 'button-container'>
      <MpcButton />
      <MpcButton />
      <MpcButton />
      <MpcButton />
      <MpcButton />
      <MpcButton />
    </div>
  )
}
