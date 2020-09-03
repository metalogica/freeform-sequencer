import React, { useState } from 'react'
import SequencerRow from './sequencer-row'
import { BsFillPlayFill, BsFillStopFill, BsMusicNote } from 'react-icons/bs';
import { CgMathEqual } from 'react-icons/cg'


const SequencerController = () => {

  // Playthrough states
  const [tempo, setTempo] = useState(90)
  const [playing, setPlay] = useState(false)
  const [spot, changeSpot] = useState(0)

  let bpm = 60000/tempo

  return (
    <div className="sequence-controls">
      <BsFillPlayFill
        style = {{ fontSize: "30px" }}
        onClick={()=>setPlay(true)}/>
      <BsFillStopFill
        style = {{ fontSize: "30px" }}
        onClick={()=>setPlay(false)}
        />
      <span style = {{ fontSize: "15px" }}>
        <BsMusicNote />
        <CgMathEqual />
        <input value={tempo} onChange={ event => setTempo(event.target.value)}/>
      </span>
    </div>
  )
}

const Sequencer = () => {
  return (
    <div className="sequencer">
      <SequencerRow/>
      <SequencerRow/>
      <SequencerRow/>
    </div>
  )
}

export default Sequencer
