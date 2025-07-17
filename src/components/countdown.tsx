"use client";

import { useState, useEffect } from 'react';

const Countdown = () => {
  const calculateTimeLeft = () => {
    // Set a fixed future date for the proposal to avoid hydration issues
    // and ensure consistency. Let's say next Saturday at 9:00 PM.
    const targetDate = new Date();
    const currentDay = targetDate.getDay(); // 0 (Sun) to 6 (Sat)
    const daysUntilSaturday = (6 - currentDay + 7) % 7 || 7; // If today is Saturday, aim for next Saturday
    targetDate.setDate(targetDate.getDate() + daysUntilSaturday);
    targetDate.setHours(21, 0, 0, 0); // 9:00 PM

    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    } else {
        timeLeft = {
            días: 0,
            horas: 0,
            minutos: 0,
            segundos: 0,
        }
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  useEffect(() => {
    // Set initial value on client mount to avoid mismatch
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-bold text-primary font-mono tracking-tighter">
          {String(timeLeft[interval]).padStart(2, '0')}
        </span>
        <span className="text-sm uppercase font-body text-foreground/70">{interval}</span>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-4 gap-4 py-4">
      {timerComponents.length ? timerComponents : <p className="col-span-4">¡El tiempo es ahora!</p>}
    </div>
  );
};

export default Countdown;
