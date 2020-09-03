import React, { useState, useEffect } from 'react'

const SequencerNode = ({beat, note, octave, synth, spot}) => {

  const [active, changeActive] = useState(false)

  const shouldPlay = () => {
    if (active && spot === beat) {
      synth.value.triggerAttackRelease(`${note.value}${octave.value}`, "2n")
    }
  }

  useEffect(() => {
    shouldPlay()
  })

  return(
    <div
      className = {
        active
          ? spot === beat
            ? "audio-node active on-beat"
            : "audio-node active"
          : spot === beat
            ? "audio-node on-beat"
            : "audio-node"
      }
      onClick = {() => changeActive(!active)}
    />
  )
}

export default SequencerNode

// "audio-node active"
