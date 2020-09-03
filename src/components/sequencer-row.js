import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { FiMoreVertical } from 'react-icons/fi'
import { notes, octaves, synths } from '../data/synth-data'

const selectStyle = {
  valueContainer: () => ({
    width: "100px",
    paddingLeft: "20px"
  })
}

const SequencerRow = ({spot}) => {

  // Tone States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])

  // Rewrite is ES2015 syntax
  const playIfActive = (spot) => {
    // active is a state
    if (this.active && this.spot === spot) {
      console.log("audio should fire")
    }
  }

  return (
    <React.Fragment>
      <div className="select-container">
        <Select
          styles={selectStyle}
          options={notes}
          value={note}
          onChange={selectedOption => setNote(selectedOption)}
        />
        <Select
          styles={selectStyle}
          options={octaves}
          value={octave}
          onChange={selectedOption => setOctave(selectedOption)}
        />
        <Select
          styles={selectStyle}
          options={synths}
          value={synth}
          onChange={selectedOption => setSynth(selectedOption)}
        />
      </div>


      {/* make audio nodes components */}
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

export default SequencerRow
