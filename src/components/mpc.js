import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-collapse'
import Select from 'react-select'
import { notes, octaves, synths, citizenDjSounds, firestore } from '../data/synth-data'
import Switch from '@material-ui/core/Switch';
import axios from 'axios'
// import CortexClient from '../CortexClient';
// new CortexClient();

const MpcButtonPair = ({left, right}) => {

  // Tone States
  const [note, setnote] = useState(notes[0])

  const [octave, setoctave] = useState(octaves[0])

  const [synth, setsynth] = useState(synths[0])

  const [dj, setdj] = useState(citizenDjSounds[0])

  // Menu State
  const [menuOpened1, setMenu1] = useState(false)

  // Switch States
  const [switchState1, changeSwitch1] = useState(true)

  // Switch Styling
  const selectStyle1 = {
    valueContainer: () => ({
      width: switchState1 ? "125px" : "500px",
      paddingLeft: "20px"
    })
  }

  // Events MGMT
  let t0

  const handleDown = (synth, note, octave, dj, switchOn) => {
    t0 = performance.now()
    setMenu1(false)
    if (switchOn) {
      synth.triggerAttackRelease(`${note}${octave}`, "2n")
    }
    if (!switchOn && dj) {
      const sound = sessionStorage.getItem(dj)
      const audio = new Audio(sound)
      audio.play()
    }
  }

  const handleUp = (menuToggle, menuOpened, menuNonToggle) => {
    if ( performance.now() - t0 > 500 ) {
      menuToggle(!menuOpened)
      menuNonToggle(false)
      t0 = 0
    }
  }

  useEffect(()=> {
    if(dj) {
      const fileName=`CitizenDJ/Dialect Samples/${dj.value}`
      const dataRef = firestore.ref(fileName)
      dataRef.getDownloadURL().then(function(url) {
        axios({
          responseType: 'blob',
          url: url,
          method: 'get',
        }).then((res) => {
          const reader = new FileReader()
          reader.addEventListener("loadend", () => {
            sessionStorage.setItem(fileName, reader.result.toString())
          })
          reader.readAsDataURL(res.data)
        })
      }).catch(function(error){
        console.log(error)
      })
    }
  })

  function clickHandler(e) {
    console.log(e.target.click())
  }

  return (
    <React.Fragment>
      <button 
        onClick={(e) => clickHandler(e) }
        onMouseDown={()=> { handleDown(synth.value, note.value, octave.value, dj ? `CitizenDJ/Dialect Samples/${dj.value}` : "", switchState1)}} >TEST
      </button>
      <div className="button-container">
        <div
          className = {menuOpened1 ? 'mpc-button ripple menuOpened' : 'mpc-button ripple'}
          onMouseDown={()=> {
            handleDown(synth.value, note.value, octave.value, dj ? `CitizenDJ/Dialect Samples/${dj.value}` : "", switchState1)
          }}
          onMouseUp={()=>{
            handleUp(setMenu1, menuOpened1)
          }}
          onTouchStart={()=> {
            handleDown(synth.value, note.value, octave.value, dj ? `CitizenDJ/Dialect Samples/${dj.value}` : "", switchState1)
          }}
          onTouchEnd={()=>{
            handleUp(setMenu1, menuOpened1)
          }}
        />
      </div>
      <Collapse isOpened={menuOpened1}>
        { switchState1 ?
          <>
            <Select
              styles={selectStyle1}
              options={synths}
              value={synth}
              onChange={selectedOption => setsynth(selectedOption)}
            />
            <Select
              styles={selectStyle1}
              options={notes}
              value={note}
              onChange={selectedOption => setnote(selectedOption)}
            />
            <Select
              styles={selectStyle1}
              options={octaves}
              value={octave}
              onChange={selectedOption => setoctave(selectedOption)}
            />
          </> :
          <Select
            styles={selectStyle1}
            options={citizenDjSounds}
            value={dj}
            onChange={selectedOption => setdj(selectedOption)}
          />
        }

        <div className="switch-container">
          <Switch
            checked={switchState1}
            onChange={() => changeSwitch1(!switchState1)}
            color="default"
            size="small"
            />
        </div>
      </Collapse>
    </React.Fragment>
  )
}

const Mpc = () => {
  return (
    <div className = 'mpc-buttons'>
      <MpcButtonPair left={"r"} right={"i"}/>
      <MpcButtonPair left={"f"} right={"j"}/>
      <MpcButtonPair left={"v"} right={"n"}/>
    </div>
  )
}

export default Mpc
