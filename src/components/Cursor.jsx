import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (event) => {
      const { clientX, clientY } = event;
      dotRef.current?.style.setProperty('--x', `${clientX}px`);
      dotRef.current?.style.setProperty('--y', `${clientY}px`);
      ringRef.current?.animate(
        { transform: `translate(${clientX - 17}px, ${clientY - 17}px)` },
        { duration: 420, fill: 'forwards', easing: 'cubic-bezier(.2,.8,.2,1)' }
      );
    };

    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <>
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
    </>
  );
}
