import React, { useState } from 'react'
import SequencerRow from './sequencer-row'
import { BsFillPlayFill, BsFillPauseFill, BsFillStopFill, BsMusicNote } from 'react-icons/bs';
import { CgMathEqual } from 'react-icons/cg'

const Sequencer = () => {

  // Playthrough states
  const [tempo, setTempo] = useState(90)
  const [playing, setPlay] = useState(false)
  const [beat, changeBeat] = useState(0)

  let freq = 60000*16/tempo

  const stop = () => {
    setPlay(false)
    changeBeat(-1)
  }

  const playPause = () => {
    setPlay(!playing)
    changeBeat(beat)
  }

  const updateBeat = () => {
    if (playing) {
      changeBeat(beat => beat + 1)
    }
  }

  // Update Spot
  setTimeout(function(){
    updateBeat()
  }, freq) ;

  return (
    <div className="sequencer">
      <div className="sequence-controls">
        { playing
          ? <BsFillPauseFill
            style = {{ fontSize: "30px" }}
            onClick={()=>playPause()}
          />
          : <BsFillPlayFill
            style = {{ fontSize: "30px" }}
            onClick={()=>playPause()}
          />
        }
        <BsFillStopFill
          style = {{ fontSize: "30px" }}
          onClick={()=>stop()}
          />
        <span style = {{ fontSize: "15px" }}>
          <BsMusicNote />
          <CgMathEqual />
          <input value={tempo} onChange={ event => setTempo(event.target.value)}/>
          <p>bpm</p>
        </span>
      </div>
      <div className="sequencer-rows">
        <SequencerRow beat={beat}/>
        <SequencerRow beat={beat}/>
        <SequencerRow beat={beat}/>
        <SequencerRow beat={beat}/>
      </div>
    </div>
  )
}

export default Sequencer
