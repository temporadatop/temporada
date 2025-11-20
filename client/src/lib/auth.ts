// Sistema de autenticação usando localStorage

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: string;
}

const USERS_KEY = 'temporadatop_users';
const CURRENT_USER_KEY = 'temporadatop_current_user';

// Obter todos os usuários
export function getAllUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Salvar usuários
function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Registrar novo usuário
export function register(data: Omit<User, 'id' | 'createdAt'>): { success: boolean; error?: string; user?: User } {
  const users = getAllUsers();
  
  // Verificar se email já existe
  if (users.some(u => u.email === data.email)) {
    return { success: false, error: 'Email já cadastrado' };
  }
  
  // Verificar se CPF já existe
  if (users.some(u => u.cpf === data.cpf)) {
    return { success: false, error: 'CPF já cadastrado' };
  }
  
  // Criar novo usuário
  const newUser: User = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Fazer login automático
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  return { success: true, user: newUser };
}

// Fazer login
export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getAllUsers();
  
  // Encontrar usuário por email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'Email ou senha incorretos' };
  }
  
  // Salvar usuário atual
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  return { success: true, user };
}

// Fazer logout
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Obter usuário atual
export function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Verificar se está logado
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Atualizar dados do usuário
export function updateUser(data: Partial<User>): { success: boolean; error?: string; user?: User } {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return { success: false, error: 'Usuário não autenticado' };
  }
  
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, error: 'Usuário não encontrado' };
  }
  
  // Atualizar usuário
  const updatedUser = { ...users[userIndex], ...data };
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  // Atualizar usuário atual
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  
  return { success: true, user: updatedUser };
}
