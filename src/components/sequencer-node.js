import React, { useState, useEffect } from 'react'

const SequencerNode = ({beat, note, octave, synth, spot, switchState, drum}) => {

  const [active, changeActive] = useState(false)

  // Firebase sample code to get download link
  // trigger with if (drum and !switchState)
  // Need to download and cache selected files

    // const fileName='DrumSounds/Akai_MPC-X__36kick.mp3'
    // const dataRef = firestore.ref(fileName)
    //
    // console.log(dataRef.getDownloadURL().then(function(url) {
    //   console.log(url)
    //   var xhr = new XMLHttpRequest();
    //   xhr.responseType = 'blob';
    //   xhr.onload = function(event) {
    //     var blob = xhr.response;
    //   };
    //   xhr.open('GET', url);
    //   xhr.send();
    // }).catch(function(error){
    //   console.log(error)
    // }))

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
