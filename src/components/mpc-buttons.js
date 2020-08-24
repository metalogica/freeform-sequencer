import React, { useState } from 'react'
import { MembraneSynth, MetalSynth } from "tone"

const Memsynth = new MembraneSynth().toDestination()
const MetSynth = new MetalSynth().toDestination()

function MpcButton() {
  let t0 = 0

  const [synth, setSynth] = useState(Memsynth)
  const [tone, setTone] = useState("C4")

  const handleMouseDown = () => {
    synth.triggerAttackRelease(tone, "2n")
    t0 = performance.now()
  }

  const handleMouseUp = () => {
    if ( performance.now() - t0 > 500 ) {
      setSynth(MetSynth)
      setTone("A0")
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
