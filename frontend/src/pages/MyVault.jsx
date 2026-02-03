import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Plus, Loader, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

export default function MyVault() {
  const { isLoggedIn, openLoginModal } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyGames = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.getMyGames();
        // Transform API response
        const transformedGames = (data || []).map(game => ({
          id: game.id,
          name: game.name,
          emoji: game.image_url || '🎲',
          description: game.description,
          ageRating: game.age_rating,
          gameType: game.game_type,
          playerCount: {
            min: game.player_count?.min_players,
            max: game.player_count?.max_players
          },
          duration: game.duration,
          isPublic: game.is_public,
          upvotes: game.upvotes,
          downvotes: game.downvotes
        }));
        setGames(transformedGames);
      } catch (err) {
        console.error('Failed to fetch games:', err);
        setError('Failed to load your games');
      } finally {
        setLoading(false);
      }
    };

    fetchMyGames();
  }, [isLoggedIn]);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (gameId) => {
    if (!confirm('Are you sure you want to delete this game?')) return;

    try {
      await api.deleteGame(gameId);
      setGames(prev => prev.filter(g => g.id !== gameId));
    } catch (err) {
      setError('Failed to delete game');
    }
  };

  const handleToggleVisibility = async (gameId, currentlyPublic) => {
    try {
      await api.setGameVisibility(gameId, !currentlyPublic);
      setGames(prev => prev.map(g =>
        g.id === gameId ? { ...g, isPublic: !currentlyPublic } : g
      ));
    } catch (err) {
      setError('Failed to update visibility');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
        <div className="w-full max-w-2xl">
          <header className="mb-12">
            <Link to="/" className="glass-button px-5 py-3 text-black/60 hover:text-black transition-colors mb-8 text-base">
              <ArrowLeft size={18} />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-6">
              <Lock size={48} strokeWidth={1.5} className="text-black/70" />
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  My Vault
                </h1>
                <p className="text-black/50 text-lg mt-2">
                  Your personal game collection
                </p>
              </div>
            </div>
          </header>

          <div className="glass-card p-16 text-center">
            <Lock size={64} strokeWidth={1.5} className="mx-auto text-black/30 mb-8" />
            <h2 className="text-2xl font-semibold text-black mb-4">
              Sign in to view your games
            </h2>
            <p className="text-black/50 text-lg mb-8">
              Create and manage your personal game collection
            </p>
            <button
              onClick={openLoginModal}
              className="glass-button glass-button-active px-8 py-4 text-lg font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <Link to="/" className="glass-button px-5 py-3 text-black/60 hover:text-black transition-colors mb-8 text-base">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-6">
            <Lock size={48} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                My Vault
              </h1>
              <p className="text-black/50 text-lg mt-2">
                {games.length} games created by you
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size={32} className="animate-spin text-black/30" />
          </div>
        ) : games.length > 0 ? (
          <>
            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search your games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30"
              />
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredGames.map((game) => (
                  <div key={game.id} className="glass-card p-6">
                    <Link to={`/game/${game.id}`}>
                      <div className="text-4xl mb-4">{game.emoji}</div>
                      <h3 className="font-semibold text-black text-lg mb-2">{game.name}</h3>
                      <p className="text-black/50 text-sm mb-4 line-clamp-2">{game.description}</p>
                    </Link>

                    <div className="flex items-center justify-between text-sm text-black/40 mb-4">
                      <span>{game.playerCount?.min}-{game.playerCount?.max} players</span>
                      <span>{game.duration}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/10">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        game.isPublic
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {game.isPublic ? 'Public' : 'Private'}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleVisibility(game.id, game.isPublic)}
                          className="p-2 text-black/40 hover:text-black transition-colors"
                          title={game.isPublic ? 'Make private' : 'Make public'}
                        >
                          {game.isPublic ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => handleDelete(game.id)}
                          className="p-2 text-black/40 hover:text-red-500 transition-colors"
                          title="Delete game"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-16 text-center text-black/40 text-lg">
                No games match your search
              </div>
            )}
          </>
        ) : (
          <div className="glass-card p-16 text-center">
            <Lock size={64} strokeWidth={1.5} className="mx-auto text-black/30 mb-8" />
            <h2 className="text-2xl font-semibold text-black mb-4">
              No games yet
            </h2>
            <p className="text-black/50 text-lg mb-8">
              Create your first game to see it here
            </p>
            <Link to="/add">
              <button className="glass-button glass-button-active px-8 py-4 text-lg font-medium">
                <Plus size={20} />
                <span>Add Your First Game</span>
              </button>
            </Link>
          </div>
        )}

        {/* Add Game FAB */}
        {games.length > 0 && (
          <Link to="/add" className="fixed bottom-8 right-8">
            <button className="glass-button glass-button-active p-5 rounded-full shadow-lg">
              <Plus size={24} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
