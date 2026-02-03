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
  const [lastUpvotedGameId, setLastUpvotedGameId] = useState(() => {
    return localStorage.getItem('lastUpvotedGameId') || null;
  });

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

      // Track last upvoted game (only when adding upvote, not removing)
      if (!remove) {
        setLastUpvotedGameId(gameId);
        localStorage.setItem('lastUpvotedGameId', gameId);
      }
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

  // Get suggested game based on last upvoted game (same type or theme)
  const lastUpvotedGame = games.find(g => g.id === lastUpvotedGameId);
  const suggestedGame = lastUpvotedGame
    ? games.find(g =>
        g.id !== lastUpvotedGameId &&
        g.id !== gameOfTheWeek?.id &&
        (g.gameType === lastUpvotedGame.gameType ||
         g.themes?.some(t => lastUpvotedGame.themes?.includes(t)))
      )
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
      gameOfTheWeek,
      suggestedGame,
      lastUpvotedGame
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGames = () => useContext(GameContext);
