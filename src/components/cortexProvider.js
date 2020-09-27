import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Menu from './menu';
import CortexClient from '../CortexClient';

const CortexProvider = () => {
  const cortexStream = new CortexClient({dispatch: useDispatch});
  cortexStream.initConnection();

  return <Menu/>;
}

export default CortexProvider;
