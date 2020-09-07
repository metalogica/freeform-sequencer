import React, { useState } from 'react'
import Select from 'react-select';
import { FiMoreVertical } from 'react-icons/fi'
import SequencerNode from './sequencer-node'
import { notes, octaves, synths } from '../data/synth-data'
import Switch from '@material-ui/core/Switch';

const selectStyle = {
  valueContainer: () => ({
    width: "100px",
    paddingLeft: "20px"
  })
}

const SequencerRow = ({beat}) => {

  // Select States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])

  // Switch State
  const [switchState, changeSwitch] = useState(true)

  return (
    <React.Fragment>
      <div className="select-container">
        <Select
          styles={selectStyle}
          options={synths}
          value={synth}
          onChange={selectedOption => setSynth(selectedOption)}
        />
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

        <div className="switch-container">
          <Switch
            checked={switchState}
            onChange={() => changeSwitch(!switchState)}
            color="default"
            size="small"
            />
        </div>
      </div>

      <div className="audio-nodes">
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {0}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {1}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {2}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {3}/>
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {4}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {5}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {6}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {7}/>
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {8}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {9}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {10}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {11}/>
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {12}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {13}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {14}/>
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {15}/>
      </div>
    </React.Fragment>
  )
}

export default SequencerRow
