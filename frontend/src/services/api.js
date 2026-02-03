const API_URL = 'https://whats-that-game-production.up.railway.app';

// Get stored token
const getToken = () => localStorage.getItem('token');

// Auth headers
const authHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// AUTH
export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  });

  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Registration failed');
  }
  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: authHeaders(),
  });

  if (!res.ok) return null;
  return res.json();
};

export const logout = () => {
  localStorage.removeItem('token');
};

// GAMES
export const getGames = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const url = `${API_URL}/games/${params.toString() ? '?' + params : ''}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
};

export const createGame = async (gameData) => {
  const res = await fetch(`${API_URL}/games/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(gameData),
  });

  if (!res.ok) throw new Error('Failed to create game');
  return res.json();
};

export const upvoteGame = async (gameId, remove = false) => {
  const res = await fetch(`${API_URL}/games/${gameId}/upvote?remove=${remove}`, {
    method: 'POST',
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to upvote');
  return res.json();
};

export const downvoteGame = async (gameId, remove = false) => {
  const res = await fetch(`${API_URL}/games/${gameId}/downvote?remove=${remove}`, {
    method: 'POST',
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to downvote');
  return res.json();
};

export const deleteGame = async (gameId) => {
  const res = await fetch(`${API_URL}/games/${gameId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to delete game');
  return true;
};

// Get single game by ID
export const getGame = async (gameId) => {
  const res = await fetch(`${API_URL}/games/${gameId}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch game');
  return res.json();
};

// Get current user's games
export const getMyGames = async (skip = 0, limit = 50) => {
  const res = await fetch(`${API_URL}/games/mine?skip=${skip}&limit=${limit}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch your games');
  return res.json();
};

// Get game metadata (enums for equipment, themes, game types)
export const getGameMetadata = async () => {
  const res = await fetch(`${API_URL}/games/metadata`);

  if (!res.ok) throw new Error('Failed to fetch metadata');
  return res.json();
};

// Report a game
export const reportGame = async (gameId, reason) => {
  const res = await fetch(`${API_URL}/games/${gameId}/report`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) throw new Error('Failed to report game');
  return res.json();
};

// Toggle game visibility (public/private)
export const setGameVisibility = async (gameId, isPublic) => {
  const res = await fetch(`${API_URL}/games/${gameId}/visibility`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ is_public: isPublic }),
  });

  if (!res.ok) throw new Error('Failed to update visibility');
  return res.json();
};
