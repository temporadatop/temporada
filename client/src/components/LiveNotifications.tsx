import { useState, useEffect } from 'react';
import { X, CheckCircle, Star, Eye } from 'lucide-react';

interface Notification {
  id: number;
  type: 'booking' | 'review' | 'viewing';
  message: string;
  icon: JSX.Element;
}

const NAMES = [
  'Aline Souza', 'Pedro Medeiros', 'Dayane Silva', 'Carlos Eduardo',
  'Juliana Costa', 'Rafael Santos', 'Mariana Oliveira', 'Lucas Ferreira',
  'Camila Alves', 'Bruno Martins', 'Fernanda Lima', 'Diego Rocha',
  'Gabriela Mendes', 'Thiago Barbosa', 'Letícia Cardoso', 'André Pereira',
  'Beatriz Gomes', 'Felipe Araújo', 'Amanda Ribeiro', 'Rodrigo Carvalho',
  'Patrícia Dias', 'Gustavo Moreira', 'Vanessa Freitas', 'Marcelo Pinto',
  'Renata Campos', 'Leonardo Nunes', 'Tatiana Correia', 'Vinícius Teixeira'
];

const PROPERTIES = [
  'Chácara Primavera', 'Sítio Cantinho do Céu', 'Rancho Vista Alegre',
  'Chácara Recanto das Águas', 'Sítio Flor do Campo', 'Chácara Bela Vista',
  'Rancho Paraíso Verde', 'Chácara Sonho Meu', 'Sítio Morada do Sol',
  'Chácara Vale Encantado', 'Rancho Pedra Alta', 'Chácara do Diego',
  'Chácara da Ana', 'Cantinho Céu Azul', 'Chácara da Vovó Mafalda',
  'Espaço Familiar da Bianca', 'Recanto do Amor', 'Chalé das Flores'
];

const ACTIONS = {
  booking: [
    'acabou de fazer sua reserva com sucesso',
    'reservou para o próximo fim de semana',
    'confirmou sua estadia',
    'garantiu sua reserva'
  ],
  review: [
    'avaliou 5 estrelas sua estadia',
    'deixou uma avaliação positiva',
    'recomendou fortemente',
    'deu nota máxima para'
  ],
  viewing: [
    'está visualizando agora',
    'está interessado em',
    'acabou de ver as fotos',
    'está verificando disponibilidade'
  ]
};

function generateNotification(): Notification {
  const types: Array<'booking' | 'review' | 'viewing'> = ['booking', 'review', 'viewing'];
  const type = types[Math.floor(Math.random() * types.length)];
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const property = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)];
  const action = ACTIONS[type][Math.floor(Math.random() * ACTIONS[type].length)];

  let icon: JSX.Element;
  let message: string;

  switch (type) {
    case 'booking':
      icon = <CheckCircle className="h-5 w-5 text-green-600" />;
      message = `${name} ${action}!`;
      break;
    case 'review':
      icon = <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
      message = `${name} ${action} ${property}!`;
      break;
    case 'viewing':
      icon = <Eye className="h-5 w-5 text-blue-600" />;
      message = `${name} ${action} ${property}`;
      break;
  }

  return {
    id: Date.now(),
    type,
    message,
    icon
  };
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Gerar primeira notificação após 3 segundos
    const initialTimeout = setTimeout(() => {
      setNotifications([generateNotification()]);
    }, 3000);

    // Gerar novas notificações a cada 8-15 segundos
    const interval = setInterval(() => {
      const newNotification = generateNotification();
      setNotifications(prev => {
        // Manter apenas as últimas 3 notificações
        const updated = [newNotification, ...prev].slice(0, 3);
        return updated;
      });

      // Remover notificação após 6 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 6000);
    }, Math.random() * 7000 + 8000); // 8-15 segundos

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="pointer-events-auto bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-[320px] max-w-[400px] animate-in slide-in-from-right duration-500"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {notification.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Agora mesmo
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
