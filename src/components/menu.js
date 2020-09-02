import React from 'react';
import { FiMic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiGridVertical } from 'react-icons/bi';

export default function Menu() {
  return (
    <div className="menu">
      <ul>
        <li style = {{ fontSize: "30px" }}>
          <a> <BiGridVertical/> </a>
        </li>
        <div className="vertical-divider"></div>
        <li style = {{ fontSize: "20px" }}>
          <a> <FiMic/> </a>
        </li>
        <div className="vertical-divider"></div>
        <li style = {{ fontSize: "30px" }}>
          <a> <BsFillPlayFill/> </a>
        </li>
      </ul>
    </div>
  )
}
