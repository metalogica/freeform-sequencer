import React, { useState } from 'react'
import Select from 'react-select';
import { BsFillPlayFill, BsFillStopFill, BsMusicNote } from 'react-icons/bs';
import { CgMathEqual } from 'react-icons/cg'
import { FiMoreVertical } from 'react-icons/fi'
import { notes, octaves, synths } from '../data/synth-data'

const selectStyle = {
  valueContainer: () => ({
    width: "100px",
    paddingLeft: "20px"
  })
}

function SequencerRow() {
  // Tone States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])

  // Playthrough states
  const [tempo, setTempo] = useState(50)
  const [playing, setPlay] = useState(false)

  return (
    <React.Fragment>
      <div className="select-container">
        <Select
          styles={selectStyle}
          options={notes}
          value={note}
          onChange={(selectedOption) => setNote(selectedOption)}
        />
        <Select
          styles={selectStyle}
          options={octaves}
          value={octave}
          onChange={(selectedOption) => setOctave(selectedOption)}
        />
        <Select
          styles={selectStyle}
          options={synths}
          value={synth}
          onChange={(selectedOption) => setSynth(selectedOption)}
        />
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
            <input value={tempo} onChange={(event)=>setTempo(event.target.value)}/>
          </span>
        </div>
      </div>
      <div className="audio-nodes">
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
      </div>
    </React.Fragment>
  )
}

export default function Sequencer() {
  return (
    <div className="sequencer">
      <SequencerRow/>
      <SequencerRow/>
      <SequencerRow/>
    </div>
  )
}
