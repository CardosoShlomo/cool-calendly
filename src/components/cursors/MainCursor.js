'use client'

import { useRef, useEffect } from 'react';

export default function MainCursor({ background }) {
  const cursor = useRef();

  useEffect(() => {
    const style = cursor.current.style;
    const mouseEnterEvent = () => {
      style.opacity = 1;
    }
    const mouseMoveEvent = e => {
      style.left = e.clientX - 5 + 'px';
      style.top = e.clientY - 5 + 'px';
    };
    const mouseLeaveEvent = () => {
      style.opacity = 0;
    }

    document.addEventListener('mouseenter', mouseEnterEvent);
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('mouseleave', mouseLeaveEvent);

    return () => {
      document.removeEventListener('mouseenter', mouseEnterEvent);
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseleave', mouseLeaveEvent);
    }
  }, []);

  return (
    <div
      ref={cursor}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "10px",
        height: "10px",
        borderRadius: "3px",
        background: background,
        border: "1px solid #fff",
        zIndex: 10,
        boxShadow: "10px 10px 60px -8px #0003",
        transition: "opacity 0.3s",
      }}
    ></div>
  );
}
