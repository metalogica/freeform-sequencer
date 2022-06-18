import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from 'react-collapse'
import Select from 'react-select'
import { notes, octaves, synths, citizenDjSounds, firestore } from '../data/synth-data'
import Switch from '@material-ui/core/Switch';
import axios from 'axios';

const MpcButton = ({commandTrigger, synth}) => {
  // Tone States
  const [note1, setNote1] = useState(notes[0])
  const [octave1, setOctave1] = useState(octaves[0])
  const [synth1, setSynth1] = useState(synths[0])
  const [dj1, setDj1] = useState(citizenDjSounds[0])

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

    console.log('hello!');
  }

  const handleUp = (menuToggle, menuOpened, menuNonToggle) => {
    if ( performance.now() - t0 > 500 ) {
      menuToggle(!menuOpened)
      // menuNonToggle(false)
      t0 = 0
    }
  }

  useEffect(()=> {
    if(dj1) {
      const fileName=`CitizenDJ/Dialect Samples/${dj1.value}`
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

  // Cortex Integration
  const [ firedLast, setFiredlast ] = useState(Date.now());

  const mentalcommandMagnitude = useSelector(state => {
    if (commandTrigger === state.mentalcommand.kind) {
      const correctTiming = () => Date.now() - firedLast > 500;
      if (correctTiming()) {
        synth.value.triggerAttackRelease(`${note1.value}${octave1.value}`, "8n");
        console.log(synth1, note1.value)
        setFiredlast(Date.now());
      }
      return state.mentalcommand.magnitude;
    }
  });

  return (
    <React.Fragment>
      <div className="button-container">
        <div
          style={ mentalcommandMagnitude > 0 ? { 'backgroundColor': `rgba(58, 217, 127, ${mentalcommandMagnitude})`, 'box-shadow': '0px 0px 20px 5px rgba(58, 217, 127, 0.5);' } : {'opacity': 1}}
          className = {menuOpened1 ? 'mpc-button ripple menuOpened' : 'mpc-button ripple'}
          onMouseDown={()=> {
            handleDown(synth1.value, note1.value, octave1.value, dj1 ? `CitizenDJ/Dialect Samples/${dj1.value}` : "", switchState1)
          }}
          onMouseUp={()=>{
            handleUp(setMenu1, menuOpened1)
          }}
          onTouchStart={()=> {
            handleDown(synth1.value, note1.value, octave1.value, dj1 ? `CitizenDJ/Dialect Samples/${dj1.value}` : "", switchState1)
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
              value={synth1}
              onChange={selectedOption => setSynth1(selectedOption)}
            />
            <Select
              styles={selectStyle1}
              options={notes}
              value={note1}
              onChange={selectedOption => setNote1(selectedOption)}
            />
            <Select
              styles={selectStyle1}
              options={octaves}
              value={octave1}
              onChange={selectedOption => setOctave1(selectedOption)}
            />
          </> :
          <Select
            styles={selectStyle1}
            options={citizenDjSounds}
            value={dj1}
            onChange={selectedOption => setDj1(selectedOption)}
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
      <div className='mpc-row'>
        <MpcButton commandTrigger={'lift'} synth={synths[2]}/>
        <MpcButton commandTrigger={'right'} synth={synths[1]}/>
      </div>
      <div className='mpc-row'>
        <MpcButton commandTrigger={'rotateLeft'} synth={synths[3]}/>
        <MpcButton commandTrigger={'pull'} synth={synths[3]}/>
      </div>
      <div className='mpc-row'>
        <MpcButton commandTrigger={'rotateRight'} synth={synths[3]}/>
        <MpcButton commandTrigger={'rotateLeft'} synth={synths[2]}/>
      </div>
    </div>
  )
}

export default Mpc
