import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Dices } from 'lucide-react';
import GameCard from '../components/GameCard';
import { useGames } from '../context/GameContext';

export default function WorldVault() {
  const { games } = useGames();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered games based on search, sorted by upvotes
  const filteredGames = useMemo(() => {
    const sorted = [...games].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

    if (!searchQuery) return sorted;

    return sorted.filter(game =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [games, searchQuery]);

  // Random game
  const goToRandomGame = () => {
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length);
      navigate(`/game/${games[randomIndex].id}`);
    }
  };

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
            <Globe size={36} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                World Vault
              </h1>
              <p className="text-black/50 text-base">
                {games.length} games from the community
              </p>
            </div>
          </div>
        </header>

        {/* Search Bar + Roll the Dice */}
        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input flex-1 px-4 py-3 text-base text-black placeholder-black/30"
          />
          <button
            onClick={goToRandomGame}
            className="glass-button px-4 py-3 cursor-pointer flex items-center gap-2 hover:bg-[var(--color-card-hover)] transition-colors"
            title="Roll the Dice"
          >
            <Dices size={20} className="text-black/60" />
            <span className="text-black font-medium hidden sm:inline text-sm">Random</span>
          </button>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-4 text-black/50 text-sm">
            Found {filteredGames.length} games
          </div>
        )}

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center text-black/40 text-base rounded-xl">
            No games found
          </div>
        )}
      </div>
    </div>
  );
}
