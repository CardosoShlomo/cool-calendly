'use client';

import { useEffect, useRef, useState } from 'react';
import { DepthContext, useDepth } from '@/context/DepthContext';
import { useCursor } from '@/context/CursorContext';

/**
 * @param {{ children: React.ReactNode, style?: React.CSSProperties, onClick?: MouseEventHandler<T> }} props
 */
export default function Container({ children, cursorType = 'pointer', className, style, triggerCursorUpdate, onClick }) {
  const container = useRef();

  const myDepth = useDepth() + 1;

  const { addCursor, updateCursor, removeCursor, registerDepth } = useCursor();

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

  useEffect(() => {
    registerDepth(myDepth);
    return handleMouseLeave;
  }, []);

  return (
    <div
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      onClick={onClick}
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
