import React from 'react';
import { FiMic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiGridVertical } from 'react-icons/bi';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Mic from './mic';
import Mpc from './mpc';
import Sequencer from './sequencer'


export default function Menu() {
  return (
    <React.Fragment>
      <HashRouter>
        <div className = 'container'>
          <Route exact path ="/" component={ Mpc }/>
          <Route path ="/mic" component={ Mic }/>
          <Route path ="/sequencer" component={ Sequencer }/>
        </div>

        <div className="menu">
          <ul>
            <li style = {{ fontSize: "30px" }}>
              <NavLink to = "/"> <BiGridVertical/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "20px" }}>
              <NavLink to = "/mic"> <FiMic/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "30px" }}>
              <NavLink to = "/sequencer"> <BsFillPlayFill/> </NavLink>
            </li>
          </ul>
        </div>

      </HashRouter>
    </React.Fragment>
  )
}
