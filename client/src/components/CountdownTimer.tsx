import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialMinutes: number;
  onTimerEnd?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialMinutes, onTimerEnd }) => {
  const initialTime = initialMinutes * 60; // Tempo em segundos
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimerEnd) {
        onTimerEnd();
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimerEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (timeLeft <= 0) {
    return (
      <div className="text-center p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-bold">
        Tempo esgotado! O valor promocional pode não estar mais disponível.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-3 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg shadow-md mb-4">
      <Clock className="h-5 w-5 mr-2 animate-pulse" />
      <span className="font-semibold text-lg">
        Reserva Promocional: {formattedTime}
      </span>
    </div>
  );
};

export default CountdownTimer;
