import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { CheckCircle, Star } from 'lucide-react';

// Lista de nomes e sobrenomes para simulação
const firstNames = ['Aline', 'Pedro', 'Dayane', 'Lucas', 'Mariana', 'Gustavo', 'Isabela', 'Rafael', 'Julia', 'Felipe'];
const lastNames = ['Souza', 'Medeiros', 'Silva', 'Oliveira', 'Santos', 'Pereira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento'];
const propertyNames = ['Chácara Recanto Serrano', 'Casa de Praia Sol Nascente', 'Apartamento Vista Mar', 'Sítio do Vovô', 'Chalé da Montanha'];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateNotification = () => {
  const type = Math.random() < 0.6 ? 'RESERVATION' : 'REVIEW';
  const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
  const property = getRandomElement(propertyNames);

  if (type === 'RESERVATION') {
    toast(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div className="text-sm">
          <p className="font-medium">{name} acabou de fazer uma reserva!</p>
          <p className="text-xs text-muted-foreground">No imóvel: {property}</p>
        </div>
      </div>,
      {
        duration: 5000,
        className: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      }
    );
  } else {
    toast(
      <div className="flex items-center space-x-2">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <div className="text-sm">
          <p className="font-medium">{name} avaliou com 5 estrelas!</p>
          <p className="text-xs text-muted-foreground">Sua estadia em: {property}</p>
        </div>
      </div>,
      {
        duration: 5000,
        className: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
      }
    );
  }
};

const ActivitySimulator: React.FC = () => {
  useEffect(() => {
    // Gera uma notificação inicial após um pequeno delay
    const initialTimeout = setTimeout(generateNotification, 3000);

    // Gera novas notificações a cada 10 a 20 segundos
    const interval = setInterval(() => {
      // Gera um intervalo aleatório entre 10 e 20 segundos (em milissegundos)
      const randomDelay = Math.random() * 10000 + 10000; 
      setTimeout(generateNotification, randomDelay);
    }, 20000); // Verifica a cada 20 segundos se deve disparar uma notificação

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return null; // Este componente não renderiza nada, apenas gerencia o efeito colateral
};

export default ActivitySimulator;
