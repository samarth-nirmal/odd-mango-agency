import React, { useEffect, useRef, useState } from 'react';

export interface CountUpProps {
  end?: number;
  value?: string | number;
  start?: number;
  duration?: number; // duration in ms, default 1600
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
  delay?: number; // delay in ms
}

/**
 * Parses strings like "$18,500", "340+", "185M+", "+340%", "42" into prefix, number, suffix.
 */
function parseValueString(val: string | number): { num: number; prefix: string; suffix: string; decimals: number } {
  if (typeof val === 'number') {
    return { num: val, prefix: '', suffix: '', decimals: Number.isInteger(val) ? 0 : 2 };
  }

  const str = String(val).trim();
  // Match prefix (non-digit non-dot), digits with optional decimal/commas, and suffix
  const match = str.match(/^([^0-9.]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { num: 0, prefix: '', suffix: str, decimals: 0 };
  }

  const rawPrefix = match[1] || '';
  const numStr = match[2].replace(/,/g, '');
  const rawSuffix = match[3] || '';
  const num = parseFloat(numStr) || 0;
  const decMatches = numStr.split('.');
  const decimals = decMatches.length > 1 ? decMatches[1].length : 0;

  return { num, prefix: rawPrefix, suffix: rawSuffix, decimals };
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  value,
  start = 0,
  duration = 1600,
  prefix,
  suffix,
  separator = ',',
  decimals,
  className = '',
  delay = 0,
}) => {
  // Determine target number, prefix, and suffix
  const parsed = parseValueString(value !== undefined ? value : (end ?? 0));
  const targetNum = end !== undefined ? end : parsed.num;
  const finalPrefix = prefix !== undefined ? prefix : parsed.prefix;
  const finalSuffix = suffix !== undefined ? suffix : parsed.suffix;
  const finalDecimals = decimals !== undefined ? decimals : parsed.decimals;

  const [count, setCount] = useState<number>(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const prevTargetRef = useRef<number>(targetNum);

  // Trigger when entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  // Run the smooth count animation with quartic easing
  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const startVal = prevTargetRef.current !== targetNum ? count : start;
    const change = targetNum - startVal;

    // Quintic / Quartic ease-out curve for satisfying deceleration
    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const currentVal = startVal + change * easedProgress;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetNum);
        prevTargetRef.current = targetNum;
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, targetNum, duration, delay]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(finalDecimals);
    const [intPart, decPart] = fixed.split('.');
    const formattedInt = separator
      ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      : intPart;
    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  };

  return (
    <span ref={elementRef} className={`inline-block tabular-nums font-variant-numeric ${className}`}>
      {finalPrefix}
      {formatNumber(count)}
      {finalSuffix}
    </span>
  );
};

export default CountUp;
