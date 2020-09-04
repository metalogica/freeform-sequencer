import React from 'react';
import { FiMic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiGridVertical } from 'react-icons/bi';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Mic from './mic';
import Mpc from './mpc';
import Sequencer from './sequencer'


const Menu = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <div className = 'container'>
          <Route exact path ="/" component={ Sequencer }/>
          <Route path ="/mic" component={ Mic }/>
          <Route path ="/mpc" component={ Mpc }/>
        </div>

        <div className="menu">
          <ul>
            <li style = {{ fontSize: "30px" }}>
              <NavLink to = "/"> <BsFillPlayFill/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "20px" }}>
              <NavLink to = "/mic"> <FiMic/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "30px" }}>
              <NavLink to = "/mpc"> <BiGridVertical/> </NavLink>
            </li>
          </ul>
        </div>

      </HashRouter>
    </React.Fragment>
  )
}

export default Menu
