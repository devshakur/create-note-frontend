import { useEffect, useState } from 'react'

export const useCyclingMessage = (
  active: boolean,
  messages: readonly string[],
  intervalMs = 1400,
) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active) return;
  
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, intervalMs);
  
    return () => clearInterval(id);
  }, [active, intervalMs, messages.length]);

  return active ? messages[index] : null
}
