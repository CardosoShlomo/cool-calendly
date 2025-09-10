'use client'

import Cursor from '@/components/Cursor';
import MainCursor from '@/components/MainCursor';
import { createContext, useContext, useState } from 'react';
import { BrowserView } from 'react-device-detect';
import { DepthContext } from './DepthContext';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }) {
  const [cursors, setCursors] = useState([]);
  const [maxDepth, setMaxDepth] = useState(0);

  const addCursor = data => {
    setCursors(prev => [...prev, data]);
    return cursors.length;
  }

  const updateCursor = (data, index) => {
    setCursors(prev => [...prev.map((e, i) => i == index ? data : e)]);
  }

  const removeCursor = () => {
    setCursors(prev => [...prev.slice(0, -1)]);
  }

  const registerDepth = depth => {
    setMaxDepth(prev => Math.max(depth, prev));
  }

  return (
    <CursorContext.Provider value={{ addCursor, updateCursor, removeCursor, registerDepth }}>
      <DepthContext.Provider value={0}>
        <BrowserView>
          {Array.from({ length: maxDepth }).map((_, i) => <Cursor key={i} index={i} count={cursors.length} maxDepth={maxDepth} data={cursors[i]}/>)}
          <MainCursor secondary={cursors.length%2 == 0} />
        </BrowserView>
        {children}
      </DepthContext.Provider>
    </CursorContext.Provider>
  );
}
