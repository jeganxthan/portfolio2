import { useEffect } from 'react';

export default function RipplePortrait() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ripple-scroll') {
        window.scrollBy({
          top: event.data.deltaY,
          left: event.data.deltaX,
          behavior: 'auto',
        });
      }
    };

    window.addEventListener('message', handleMessage, { passive: true });
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      src="/ripple.html"
      title="Ripple point cloud"
      className="ripple-portrait-frame"
      loading="eager"
    />
  );
}
