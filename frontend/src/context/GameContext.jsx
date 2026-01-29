import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../services/api';

const GameContext = createContext();

export function GameProvider({ children }) {
  const { isLoggedIn, openLoginModal } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedGameIds, setSavedGameIds] = useState(() => {
    const saved = localStorage.getItem('savedGames');
    return saved ? JSON.parse(saved) : [];
  });
  const [userUpvotes, setUserUpvotes] = useState({});

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await api.getGames();
        // Transform API response to match frontend format
        const transformedGames = data.map(game => ({
          id: game.id,
          name: game.name,
          emoji: game.image_url || '🎲',
          description: game.description,
          ageRating: game.age_rating,
          gameType: game.game_type,
          playerCount: {
            min: game.player_count.min_players,
            max: game.player_count.max_players
          },
          duration: game.duration,
          equipment: game.equipment.map(e => e.equipment_name),
          themes: game.themes.map(t => t.theme_name),
          rules: game.rules,
          upvotes: game.upvotes,
          downvotes: game.downvotes,
          contributor: {
            name: game.contributor.username
          }
        }));
        setGames(transformedGames);
      } catch (e) {
        console.error('Failed to fetch games:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Save to localStorage when savedGameIds changes
  useEffect(() => {
    localStorage.setItem('savedGames', JSON.stringify(savedGameIds));
  }, [savedGameIds]);

  const toggleSaved = (gameId) => {
    setSavedGameIds(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const toggleUpvote = async (gameId) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      const remove = userUpvotes[gameId] || false;
      const result = await api.upvoteGame(gameId, remove);

      // Update local state
      setGames(prev => prev.map(game =>
        game.id === gameId
          ? { ...game, upvotes: result.upvotes }
          : game
      ));
      setUserUpvotes(prev => ({ ...prev, [gameId]: !remove }));
    } catch (e) {
      console.error('Failed to upvote:', e);
    }
  };

  const upvotes = games.reduce((acc, game) => {
    acc[game.id] = game.upvotes;
    return acc;
  }, {});

  const savedGames = games.filter(g => savedGameIds.includes(g.id));
  const gameOfTheWeek = games.length > 0
    ? games.reduce((a, b) => (a.upvotes > b.upvotes ? a : b))
    : null;

  return (
    <GameContext.Provider value={{
      games,
      loading,
      savedGames,
      savedGameIds,
      toggleSaved,
      upvotes,
      userUpvotes,
      toggleUpvote,
      gameOfTheWeek
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGames = () => useContext(GameContext);
