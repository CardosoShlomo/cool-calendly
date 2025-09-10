'use client'

import { useRef, useEffect } from 'react';

export default function Cursor({ index, count, maxDepth, data }) {
  const cursor = useRef();
  const previous = useRef(null);
  const next = useRef(data);

  useEffect(() => {
    previous.current = next.current;
    next.current = data;
  }, [data]);
  
  const radiusValues = useRef([]);

  const mouse = useRef({x: 0, y: 0});

  const animation = useRef();

  useEffect(() => {
    if (animation.current) {
      cursor.current.style.opacity = count >= index ? 1 : 0;
    }
  }, [count]);

  const run = () => animation.current = requestAnimationFrame(animate);
  const stop = () => {
    cancelAnimationFrame(animation.current);
    animation.current = null;
  }

  const animate = () => {
    let same;
    
    const target = next.current?.rect ?? {
      left: mouse.current.x - 5,
      top: mouse.current.y - 5,
      width: 10,
      height: 10,
    }

    const style = cursor.current.style;

    const fromTo = (from, to, eps = 0.1) => {
      const f = parseFloat(from) || 0;
      const delay = (maxDepth - index) * 3;
      return Math.abs(f - to) < eps ? to : f + (to - f) / delay;
    }

    let left = fromTo(style.left, target.left);
    let top = fromTo(style.top, target.top);
    let width = fromTo(style.width, target.width);
    let height = fromTo(style.height, target.height);

    same =
      left === target.left &&
      top === target.top &&
      width === target.width &&
      height === target.height;

    cursor.current.style.left = left + 'px';
    cursor.current.style.top = top + 'px';
    cursor.current.style.width = width + 'px';
    cursor.current.style.height = height + 'px';

    let radiusString = '';
    if (next.current) {
      const obj = next.current.borderRadius;
      obj.values.forEach((e, i) => {
        if (!radiusValues.current[i]) {
          radiusValues.current[i] = 1;
        }
        radiusValues.current[i] += (e - radiusValues.current[i]) / 10;
        if (!isNaN(radiusValues.current[i])) {
          radiusString += radiusValues.current[i] + obj.symbols[i] + ' ';
        }
      });
    } else if (previous.current) {
      const obj = previous.current.borderRadius;
      let count = 0;
      obj?.symbols.forEach((e, i) => {
        radiusValues.current[i] += (0 - radiusValues.current[i]) / 15;
        if (!isNaN(radiusValues.current[i])) {
          radiusString += radiusValues.current[i] + e + ' ';
          if (Math.round(radiusValues.current[i]) == 0) {
            count++;
          }
        }
      });
      if (count == radiusValues.current.length) {
        previous.current = null;
      }
    }
    
    if (same) {
      same = cursor.current.style.borderRadius == radiusString;
    }
    cursor.current.style.borderRadius = radiusString;
    
    same ? stop() : run();
  };

  useEffect(() => {
    const mouseEnterEvent = e => {
      const x = e.clientX, y = e.clientY;
      mouse.current = {x: x, y: y};
      cursor.current.style.left = (x - 5) + 'px';
      cursor.current.style.top = (y - 5) + 'px';
      cursor.current.style.opacity = count >= index ? 1 : 0;
      run();
    }
    const mouseMoveEvent = e => {
      mouse.current = {x: e.clientX, y: e.clientY};
      if (!animation.current) {
        run();
      }
    }
    const mouseLeaveEvent = () => {
      stop();
      cursor.current.style.opacity = 0;
    }

    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);
    document.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      stop();
      
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);
      document.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);

  return <div
  ref={cursor}
  style={{
    position: "fixed",
    pointerEvents: "none",
    background: index%2 == 0 ? "linear-gradient(45deg, #3B4371, #F3904F)" : "#fff",
    zIndex: index - maxDepth,
    width: "10px",
    height: "10px",
    boxShadow: "10px 10px 60px -8px #0003",
    transition: "opacity 0.3s",
  }}
  />;
}
