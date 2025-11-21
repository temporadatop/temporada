import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';

interface GeolocationData {
  city: string | null;
  region: string | null;
  country: string | null;
  loading: boolean;
  error: boolean;
}

/**
 * Hook para detectar a localização do usuário
 * Prioridade:
 * 1. Cidade do usuário logado (do cadastro)
 * 2. API de IP (fallback para visitantes não logados)
 */
export function useGeolocation(): GeolocationData {
  const [data, setData] = useState<GeolocationData>({
    city: null,
    region: null,
    country: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // PRIORIDADE 1: Verificar se usuário está logado e tem cidade no cadastro
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.city) {
      console.log('[Geolocation] Using logged user city:', currentUser.city);
      setData({
        city: currentUser.city,
        region: currentUser.state || null,
        country: 'Brasil',
        loading: false,
        error: false,
      });
      return;
    }

    // PRIORIDADE 2: Verificar se já temos dados em cache (localStorage)
    const cachedData = localStorage.getItem('geolocation');
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        // Cache válido por 24 horas
        const cacheTime = parsed.timestamp || 0;
        const now = Date.now();
        if (now - cacheTime < 24 * 60 * 60 * 1000) {
          setData({
            city: parsed.city,
            region: parsed.region,
            country: parsed.country,
            loading: false,
            error: false,
          });
          return;
        }
      } catch (e) {
        // Cache inválido, continuar com fetch
      }
    }

    // Buscar localização via API (ip-api.com é mais precisa que ipapi.co)
    fetch('http://ip-api.com/json/?fields=status,message,country,regionName,city')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch geolocation');
        }
        return response.json();
      })
      .then((result) => {
        console.log('[Geolocation] API Response:', result);
        
        // Verificar se a API retornou sucesso
        if (result.status !== 'success') {
          throw new Error(result.message || 'Geolocation failed');
        }
        
        const locationData = {
          city: result.city || null,
          region: result.regionName || null,
          country: result.country || null,
          timestamp: Date.now(),
        };
        console.log('[Geolocation] Detected city:', locationData.city);

        // Salvar no cache
        localStorage.setItem('geolocation', JSON.stringify(locationData));

        setData({
          city: locationData.city,
          region: locationData.region,
          country: locationData.country,
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        console.error('Geolocation error:', error);
        setData({
          city: null,
          region: null,
          country: null,
          loading: false,
          error: true,
        });
      });
  }, []);

  return data;
}
