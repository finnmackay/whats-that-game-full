import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Plus, Loader, Trash2, Eye, EyeOff, Bookmark, PenTool } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGames } from '../context/GameContext';
import GameCard from '../components/GameCard';
import * as api from '../services/api';

export default function MyVault() {
  const { isLoggedIn, openLoginModal } = useAuth();
  const { savedGames } = useGames();
  const [myGames, setMyGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('creations');

  useEffect(() => {
    const fetchMyGames = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.getMyGames();
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
        setMyGames(transformedGames);
      } catch (err) {
        console.error('Failed to fetch games:', err);
        setError('Failed to load your games');
      } finally {
        setLoading(false);
      }
    };

    fetchMyGames();
  }, [isLoggedIn]);

  const currentGames = activeTab === 'creations' ? myGames : savedGames;
  const filteredGames = currentGames.filter(game =>
    game.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (gameId) => {
    if (!confirm('Are you sure you want to delete this game?')) return;

    try {
      await api.deleteGame(gameId);
      setMyGames(prev => prev.filter(g => g.id !== gameId));
    } catch (err) {
      setError('Failed to delete game');
    }
  };

  const handleToggleVisibility = async (gameId, currentlyPublic) => {
    try {
      await api.setGameVisibility(gameId, !currentlyPublic);
      setMyGames(prev => prev.map(g =>
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
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-12 md:py-16 lg:px-20">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <Link to="/" className="glass-button px-4 py-2 text-black/60 hover:text-black transition-colors mb-6 text-sm inline-flex">
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <Lock size={36} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                My Vault
              </h1>
              <p className="text-black/50 text-base">
                Your personal collection
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('creations')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'creations'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-card)] text-black/60 hover:text-black hover:bg-[var(--color-card-hover)]'
            }`}
          >
            <PenTool size={16} />
            <span>My Creations</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-card)] text-black/60 hover:text-black hover:bg-[var(--color-card-hover)]'
            }`}
          >
            <Bookmark size={16} />
            <span>Saved Games</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30 rounded-xl"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size={32} className="animate-spin text-black/30" />
          </div>
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center rounded-xl">
            <div className="text-4xl mb-4">{activeTab === 'creations' ? '✏️' : '⭐'}</div>
            <h2 className="text-lg font-semibold text-black mb-2">
              {activeTab === 'creations' ? 'No games created yet' : 'No saved games yet'}
            </h2>
            <p className="text-black/50 text-sm mb-6">
              {activeTab === 'creations'
                ? 'Create your first game to see it here'
                : 'Save games from the World Vault'}
            </p>
            <Link to={activeTab === 'creations' ? '/add' : '/world-vault'}>
              <button className="glass-button glass-button-active px-6 py-3 text-sm font-medium rounded-xl">
                {activeTab === 'creations' ? (
                  <>
                    <Plus size={16} />
                    <span>Add Game</span>
                  </>
                ) : (
                  <span>Browse World Vault</span>
                )}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
