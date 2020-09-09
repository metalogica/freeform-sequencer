import React, { useState } from 'react';
import { FiMic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiGridVertical } from 'react-icons/bi';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Mic from './mic';
import Mpc from './mpc';
import Sequencer from './sequencer'
import { firestore, drumSounds } from '../data/synth-data'

const Menu = () => {

  const [content, changeContent] = useState(1)

  // Firebase sample code to get download link
    // const fileName='DrumSounds/Akai_MPC-X__36kick.mp3'
    // const dataRef = fireData.ref(fileName)
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

  // Firebase code to get metadata
  console.log(drumSounds)

  return (
    <React.Fragment>
      <HashRouter>
        <div className = 'container'>
          <Route exact path ="/" component={ Sequencer }/>
          <Route path ="/mic" component={ Mic } />
          <Route path ="/mpc" component={ Mpc } />
        </div>

        <div className="menu">
          <ul>
            <li style = {{ fontSize: "30px" }} onClick={()=>changeContent(1)}>
              <NavLink to = "/" style={ content === 1 ? {color: "white" }: {}}> <BsFillPlayFill/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "20px" }} onClick={()=>changeContent(2)}>
              <NavLink to = "/mic" style={ content === 2 ? {color: "white" }: {}}> <FiMic/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "30px" }} onClick={()=>changeContent(3)}>
              <NavLink to = "/mpc" style={ content === 3 ? {color: "white" }: {}}> <BiGridVertical/> </NavLink>
            </li>
          </ul>
        </div>

      </HashRouter>
    </React.Fragment>
  )
}

export default Menu
