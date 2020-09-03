import React, { useState } from 'react'
import Select from 'react-select';
import { FiMoreVertical } from 'react-icons/fi'
import { notes, octaves, synths } from '../data/synth-data'

const selectStyle = {
  valueContainer: () => ({
    width: "100px",
    paddingLeft: "20px"
  })
}

const SequencerRow = () => {
  // Tone States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])

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
