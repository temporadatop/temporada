import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface UrgencyTimerProps {
  onExpire?: () => void;
}

export default function UrgencyTimer({ onExpire }: UrgencyTimerProps) {
  const TOTAL_SECONDS = 5 * 60; // 5 minutos
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Verificar se já existe um timer ativo no localStorage
    const savedTimer = localStorage.getItem('urgencyTimer');
    if (savedTimer) {
      const { startTime, duration } = JSON.parse(savedTimer);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;
      
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        setIsExpired(true);
        setTimeLeft(0);
        if (onExpire) onExpire();
      }
    } else {
      // Salvar novo timer
      localStorage.setItem('urgencyTimer', JSON.stringify({
        startTime: Date.now(),
        duration: TOTAL_SECONDS
      }));
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          localStorage.removeItem('urgencyTimer');
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const percentage = (timeLeft / TOTAL_SECONDS) * 100;

  if (isExpired) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3">
            <Clock className="h-6 w-6 animate-pulse" />
            <div className="text-center">
              <p className="text-lg font-bold">⏰ Tempo Esgotado!</p>
              <p className="text-sm opacity-90">
                A oferta promocional expirou. O preço regular será aplicado.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 animate-pulse" />
            <div>
              <p className="text-lg font-bold">🔥 Oferta Relâmpago!</p>
              <p className="text-sm opacity-90">
                Garanta este preço promocional agora!
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
                Tempo Restante
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-white/30">
                <p className="text-4xl font-bold tabular-nums tracking-tight">
                  {formattedTime}
                </p>
              </div>
            </div>
            
            {timeLeft <= 60 && (
              <div className="animate-bounce">
                <p className="text-2xl">⚡</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              percentage < 20 ? 'bg-red-400' : 'bg-white'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
