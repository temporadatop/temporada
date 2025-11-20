-- ========================================
-- TemporadaTop - Setup Supabase
-- Execute este script no SQL Editor do Supabase
-- ========================================

-- PASSO 1: Criar tabelas
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  "openId" VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  phone VARCHAR(20),
  cpf VARCHAR(14),
  "loginMethod" VARCHAR(64),
  role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'owner', 'admin')),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  "lastSignedIn" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.properties (
  id SERIAL PRIMARY KEY,
  "ownerId" INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state VARCHAR(2) NOT NULL,
  "zipCode" VARCHAR(10),
  latitude TEXT,
  longitude TEXT,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  bedrooms INTEGER,
  bathrooms INTEGER,
  "pricePerNight" INTEGER NOT NULL CHECK ("pricePerNight" > 0),
  rules TEXT,
  amenities TEXT,
  images TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- PASSO 2: Criar índices
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON public.properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_owner ON public.properties("ownerId");

-- PASSO 3: Inserir usuário admin
INSERT INTO public.users ("openId", name, email, role)
VALUES ('admin-temporadatop', 'Admin TemporadaTop', 'admin@temporadatop.com', 'admin')
ON CONFLICT ("openId") DO NOTHING;

-- PASSO 4: Inserir as 11 chácaras
INSERT INTO public.properties ("ownerId", title, description, address, city, state, capacity, bedrooms, bathrooms, "pricePerNight", amenities, images, status) VALUES
(1, 'Chácara Primavera', 'Bem-vindo à Chácara Primavera, um refúgio encantador em Atibaia! Este espaço acolhedor foi pensado para proporcionar momentos inesquecíveis em família ou entre amigos.', 'Rua das Flores, 123', 'Atibaia', 'SP', 6, 3, 2, 42500, '["Piscina", "Churrasqueira", "Wi-Fi"]', '["/properties/chacara-01-foto-01.jpg"]', 'active'),
(1, 'Sítio Cantinho do Céu', 'O Sítio Cantinho do Céu é um verdadeiro paraíso escondido em Nazaré Paulista! Perfeito para quem busca paz e contato com a natureza.', 'Estrada do Sítio, km 5', 'Nazaré Paulista', 'SP', 5, 2, 2, 33500, '["Piscina", "Churrasqueira", "Vista montanhas"]', '["/properties/chacara-02-foto-01.jpg"]', 'active'),
(1, 'Rancho Vista Alegre', 'O Rancho Vista Alegre é o espaço ideal para grandes celebrações e confraternizações! Localizado em Mogi das Cruzes.', 'Avenida dos Ranchos, 456', 'Mogi das Cruzes', 'SP', 12, 5, 3, 49600, '["Piscina grande", "Churrasqueira", "Salão festas"]', '["/properties/chacara-03-foto-01.jpg"]', 'active'),
(1, 'Chácara Recanto das Águas', 'A Chácara Recanto das Águas é um verdadeiro oásis urbano em São Paulo! Apesar de estar próxima à cidade, oferece tranquilidade.', 'Rua das Cachoeiras, 789', 'São Paulo', 'SP', 6, 3, 2, 59100, '["Piscina aquecada", "Churrasqueira", "Área gourmet"]', '["/properties/chacara-04-foto-01.jpg"]', 'active'),
(1, 'Sítio Flor do Campo', 'O Sítio Flor do Campo em Ibiúna é um convite à vida simples e autêntica do campo! Com capacidade para 9 pessoas.', 'Estrada da Serra, km 12', 'Ibiúna', 'SP', 9, 4, 3, 49400, '["Piscina natural", "Churrasqueira", "Pomar"]', '["/properties/chacara-05-foto-01.jpg"]', 'active'),
(1, 'Chácara Bela Vista', 'A Chácara Bela Vista em Mairiporã oferece exatamente o que seu nome promete: vistas deslumbrantes e muita beleza natural!', 'Rua do Mirante, 321', 'Mairiporã', 'SP', 6, 3, 2, 44500, '["Piscina borda infinita", "Churrasqueira", "Deck"]', '["/properties/chacara-06-foto-01.jpg"]', 'active'),
(1, 'Rancho Paraíso Verde', 'O Rancho Paraíso Verde em Guararema é o destino perfeito para grandes grupos e celebrações memoráveis!', 'Rodovia dos Ranchos, km 8', 'Guararema', 'SP', 13, 6, 4, 53500, '["Piscina olímpica", "Quadra", "Salão jogos"]', '["/properties/chacara-07-foto-01.jpg"]', 'active'),
(1, 'Chácara Sonho Meu', 'A Chácara Sonho Meu em Ribeirão Pires é o espaço dos seus sonhos para grandes encontros! Capacidade para 16 pessoas.', 'Avenida das Chácaras, 654', 'Ribeirão Pires', 'SP', 16, 7, 5, 55200, '["Piscina aquecada", "Salão festas", "Playground"]', '["/properties/chacara-08-foto-01.jpg"]', 'active'),
(1, 'Sítio Morada do Sol', 'O Sítio Morada do Sol em Extrema, MG, é um refúgio romântico perfeito para casais! Acomodando até 2 pessoas.', 'Estrada da Montanha, s/n', 'Extrema', 'MG', 2, 1, 1, 46300, '["Piscina aquecada", "Hidromassagem", "Lareira"]', '["/properties/chacara-09-foto-01.jpg"]', 'active'),
(1, 'Chácara Vale Encantado', 'A Chácara Vale Encantado em Atibaia é verdadeiramente encantadora! Com capacidade para 15 pessoas.', 'Vale dos Sonhos, 987', 'Atibaia', 'SP', 15, 6, 5, 45700, '["Piscina tobogã", "Sauna", "Sala jogos"]', '["/properties/chacara-10-foto-01.jpg"]', 'active'),
(1, 'Rancho Pedra Alta', 'O Rancho Pedra Alta em São Bento do Sapucaí é um refúgio de montanha para casais aventureiros!', 'Serra da Mantiqueira, km 15', 'São Bento do Sapucaí', 'SP', 2, 1, 1, 48100, '["Piscina natural", "Lareira", "Trilhas"]', '["/properties/chacara-11-foto-01.jpg"]', 'active');

-- Pronto! Tabelas criadas e 11 chácaras inseridas! 🎉
