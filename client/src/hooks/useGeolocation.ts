import { useState, useEffect } from 'react';

interface GeolocationData {
  city: string | null;
  region: string | null;
  country: string | null;
  loading: boolean;
  error: boolean;
}

/**
 * Hook para detectar a localização do usuário baseado no IP
 * Usa a API gratuita ipapi.co (sem necessidade de chave)
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
    // Verificar se já temos dados em cache (localStorage)
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

    // Buscar localização via API
    fetch('https://ipapi.co/json/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch geolocation');
        }
        return response.json();
      })
      .then((result) => {
        console.log('[Geolocation] API Response:', result);
        const locationData = {
          city: result.city || null,
          region: result.region || null,
          country: result.country_name || null,
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
