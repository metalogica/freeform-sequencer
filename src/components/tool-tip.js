import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const CustomToolTip = withStyles((theme) => ({
  tooltip: {
    fontSize: 18,
    maxWidth: '70vw',
  },
}))(Tooltip);

const tip =
  <div>
    <p>
      Thanks for visiting this webapp! There's always more work to do so if you have
      any ideas feel free to reach me at ehymowitz@gmail.com
    </p>
    <p>
      There are two pages on here so far - the main sequencer page and the live
      trigger page which I modeled after an MPC3000. You can open more than one
      page of this webapp so I HIGHLY recommend making a loop in one page then opening
      a new page to improvise sounds over the loop in another session.
    </p>
    <p>
      Sequencer: You can change the BPM, mess with different sounds and the switch gives
      access to some classic percussion sounds.
    </p>
    <p>
      MPC: Hold down a trigger to open the menu to change the sound - experiment
      with synths or hit the switch to play with sounds from Citizen DJ (there
        are alot)
    </p>
    <p>
      Enjoy!
    </p>
  </div>

const HoverTip = () => {

  return (
    <CustomToolTip title={tip}>
      <p className="hover-tip">?</p>
    </CustomToolTip>
  )
}

export default HoverTip
