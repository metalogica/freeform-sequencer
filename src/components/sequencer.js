import React, { useState } from 'react'
import Select from 'react-select';
import { notes, octaves, synths } from '../data/synth-data'

function SequencerRow() {
  // Tone States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])
  const [menuOpened, setMenu] = useState(false)

  return (
    <div className="sequencer">
      <div className="select-container">
        <Select
          options={notes}
          value={note}
          onChange={(selectedOption) => setNote(selectedOption)}
        />
        <Select
          options={octaves}
          value={octave}
          onChange={(selectedOption) => setOctave(selectedOption)}
        />
        <Select
          options={synths}
          value={synth}
          onChange={(selectedOption) => setSynth(selectedOption)}
        />
      </div>
      <div className="audio-nodes">
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
        <div className = "audio-node" />
      </div>
    </div>
  )
}

export default function Sequencer() {
  return (
    <React.Fragment>
      <SequencerRow/>
      <SequencerRow/>
      <SequencerRow/>
    </React.Fragment>
  )
}
