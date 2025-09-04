'use client'

import { createContext, useContext } from 'react';

export const DepthContext = createContext(0);
export const useDepth = () => useContext(DepthContext);
