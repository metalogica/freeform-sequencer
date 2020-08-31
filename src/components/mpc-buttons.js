import React, { useState } from 'react'
import { MembraneSynth, MetalSynth } from "tone"
import { UnmountClosed } from 'react-collapse';
import Select from 'react-select';

// Init Synths
const Memsynth = new MembraneSynth().toDestination()
const MetSynth = new MetalSynth().toDestination()

// Select Parameters
const notes = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
]

const octaves = [
  { value: '0', label: '0', },
  { value: '1', label: '1', },
  { value: '2', label: '2', },
  { value: '3', label: '3', },
  { value: '4', label: '4', },
  { value: '5', label: '5', },
  { value: '6', label: '6', },
  { value: '7', label: '7', },
  { value: '8', label: '8', },
]

const synths = [
  { value: Memsynth, label: 'Membrane' },
  { value: MetSynth, label: 'Metallic' },
]

function MpcButton() {

  // Tone States
  const [note1, setNote1] = useState(notes[0])
  const [note2, setNote2] = useState(notes[0])

  const [octave1, setOctave1] = useState(octaves[0])
  const [octave2, setOctave2] = useState(octaves[0])

  const [synth1, setSynth1] = useState(synths[0])
  const [synth2, setSynth2] = useState(synths[0])

  // Menu State
  const [menuOpened1, setMenu1] = useState(false)
  const [menuOpened2, setMenu2] = useState(false)

  // Events MGMT
  let t0

  const handleMouseDown = (synth, note, octave) => {
    t0 = performance.now()
    setMenu1(false)
    setMenu2(false)
    synth.triggerAttackRelease(`${note}${octave}`, "2n")
    window.navigator.vibrate(100);
  }

  const handleMouseUp = (menuToggle, menuOpened, menuNonToggle) => {
    if ( performance.now() - t0 > 500 ) {
      menuToggle(!menuOpened)
      menuNonToggle(false)
      t0 = 0
    }
  }

  return (
    <React.Fragment>
      <div className="button-container">
        <div
          className = {menuOpened1 ? 'mpc-button ripple menuOpened' : 'mpc-button ripple'}
          onMouseDown={()=> {
            handleMouseDown()
          }}
          onMouseUp={()=>{
            handleMouseUp(synth1.value, note1.value, octave1.value, setMenu1, menuOpened1, setMenu2)
          }}
          onTouchStart={()=> {
            handleMouseDown()
          }}
          onTouchEnd={()=>{
            handleMouseUp(synth1.value, note1.value, octave1.value, setMenu1, menuOpened1, setMenu2)
          }}
        />
        <div
          className = {menuOpened2 ? 'mpc-button ripple menuOpened' : 'mpc-button ripple'}
          onMouseDown={()=> {
            handleMouseDown()
          }}
          onMouseUp={()=>{
            handleMouseUp(synth2.value, note2.value, octave2.value, setMenu2, menuOpened2, setMenu1)
          }}
          onTouchStart={()=> {
            handleMouseDown()
          }}
          onTouchEnd={()=>{
            handleMouseUp(synth1.value, note1.value, octave1.value, setMenu1, menuOpened1, setMenu2)
          }}
        />
      </div>
      <UnmountClosed isOpened={menuOpened1}>
        <Select
          options={notes}
          value={note1}
          onChange={(selectedOption) => setNote1(selectedOption)}
        />
        <Select
          options={octaves}
          value={octave1}
          onChange={(selectedOption) => setOctave1(selectedOption)}
        />
        <Select
          options={synths}
          value={synth1}
          onChange={(selectedOption) => setSynth1(selectedOption)}
        />
      </UnmountClosed>
      <UnmountClosed isOpened={menuOpened2}>
        <Select
          options={notes}
          value={note2}
          onChange={(selectedOption) => setNote2(selectedOption)}
        />
        <Select
          options={octaves}
          value={octave2}
          onChange={(selectedOption) => setOctave2(selectedOption)}
        />
        <Select
          options={synths}
          value={synth2}
          onChange={(selectedOption) => setSynth2(selectedOption)}
        />
      </UnmountClosed>
    </React.Fragment>
  )
}

export default function MpcButtons() {

  return (
    <div className = 'mpc-buttons'>
      <MpcButton />
      <MpcButton />
      <MpcButton />
    </div>
  )
}
