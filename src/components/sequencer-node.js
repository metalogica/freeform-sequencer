import React, { useState } from 'react'
import { notes, octaves, synths } from '../data/synth-data'

const SequencerNode = ({beat, note, octave, synth, spot}) => {

  const [active, changeActive] = useState(false)

  const shouldPlay = () => {
    if (active && spot === beat) {
      synth.value.triggerAttackRelease(`${note.value}${octave.value}`, "2n")
    }
  }

  shouldPlay()

  return(
    <div
      className = {active ? "audio-node active" : "audio-node"}
      onClick = {() => changeActive(!active)}
    />
  )
}

export default SequencerNode
