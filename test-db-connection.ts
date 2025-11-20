import { getAllActiveProperties } from './server/db';

async function testConnection() {
  console.log('🔍 Testando conexão com banco...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'NÃO configurada');
  
  try {
    const properties = await getAllActiveProperties();
    console.log(`✅ Sucesso! Encontradas ${properties.length} propriedades`);
    console.log('Propriedades:', properties.map(p => ({ id: p.id, name: p.name, status: p.status })));
  } catch (error) {
    console.error('❌ Erro ao buscar propriedades:', error);
  }
  
  process.exit(0);
}

testConnection();
