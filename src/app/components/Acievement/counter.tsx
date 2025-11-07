"use client";

import { useEffect, useState } from "react";


interface CounterProps {
  value: number;
  duration?: number;
  idx: number;
}

export default function Counter({ value, duration = 2000, idx }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = 10;
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  const formatted = count.toLocaleString();

  return (
    <div className="flex flex-col">
      <span
        className={`font-bold  ${
          idx === 1 ? "text-center w-full" : ""
        }`}
      >
        {formatted}
      </span>
    </div>
  );
}
