'use client';

import { useEffect, useRef, useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { DepthContext, useDepth } from '@/context/DepthContext';

export default function Container({ children, cursorType = 'pointer', className, style, triggerCursorUpdate }) {
  const container = useRef();

  const { addCursor, updateCursor, removeCursor, registerDepth } = useCursor();

  const myDepth = useDepth() + 1;
  useEffect(() => {
    registerDepth(myDepth);
  }, []);

  const [color, setColor] = useState('inherit');

  const cursorIndex = useRef();

  const containerData = () => {
    const values = [];
    const symbols = [];
    window.getComputedStyle(container.current).borderRadius.split(' ').forEach(e => {
      const matches = e.match(/^(\d+)(\D*)$/);
      values.push(matches?.[1] || "0");
      symbols.push(matches?.[2] || "");
    });
    return {
      rect: container.current.getBoundingClientRect(),
      borderRadius: { values, symbols },
      cursorType,
    };
  }

  const handleMouseEnter = () => {
    const index = addCursor(containerData());
    cursorIndex.current = index;
    setColor(index % 2 === 0 ? 'white' : 'black');
  };

  const handleMouseLeave = () => {
    removeCursor(cursorIndex.current);
    setColor('inherit');
  };

  useEffect(() => {
    if (cursorIndex.current !== undefined) {
      updateCursor(containerData(), cursorIndex.current);
    }
  }, [triggerCursorUpdate]);

  return (
    <div
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        color: color,
        ...style,
      }}
    >
      <DepthContext.Provider value={myDepth}>
        {children}
      </DepthContext.Provider>
    </div>
  );
}
