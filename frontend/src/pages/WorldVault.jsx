import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Filter, X } from 'lucide-react';
import GameCard from '../components/GameCard';
import { useGames } from '../context/GameContext';
import * as api from '../services/api';

const PLAYER_COUNTS = ['any', '2', '3-4', '5-6', '7+'];
const DURATIONS = ['any', '5-10 min', '15-30 min', '30-60 min', '1+ hour'];

export default function WorldVault() {
  const { games } = useGames();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [playerCount, setPlayerCount] = useState('any');
  const [duration, setDuration] = useState('any');
  const [ageRating, setAgeRating] = useState('any');
  const [metadata, setMetadata] = useState(null);

  // Fetch metadata for dynamic filters
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await api.getGameMetadata();
        setMetadata(data);
      } catch (err) {
        console.error('Failed to fetch metadata:', err);
      }
    };
    fetchMetadata();
  }, []);

  const gameTypes = metadata?.game_types || ['card', 'dice', 'board', 'party', 'strategy', 'drinking'];
  const ageRatings = metadata?.age_ratings || ['12+', '18+'];

  const filteredGames = games.filter(game => {
    // Type filter
    const matchesType = activeFilter === 'all' || game.gameType === activeFilter;

    // Search filter
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Player count filter
    let matchesPlayers = true;
    if (playerCount !== 'any') {
      const min = game.playerCount?.min || 0;
      const max = game.playerCount?.max || 100;
      if (playerCount === '2') matchesPlayers = min <= 2 && max >= 2;
      else if (playerCount === '3-4') matchesPlayers = min <= 4 && max >= 3;
      else if (playerCount === '5-6') matchesPlayers = min <= 6 && max >= 5;
      else if (playerCount === '7+') matchesPlayers = max >= 7;
    }

    // Duration filter
    let matchesDuration = true;
    if (duration !== 'any' && game.duration) {
      const d = game.duration.toLowerCase();
      if (duration === '5-10 min') matchesDuration = d.includes('5') || d.includes('10');
      else if (duration === '15-30 min') matchesDuration = d.includes('15') || d.includes('20') || d.includes('30');
      else if (duration === '30-60 min') matchesDuration = d.includes('30') || d.includes('45') || d.includes('60') || d.includes('1 hour');
      else if (duration === '1+ hour') matchesDuration = d.includes('hour') || d.includes('2+');
    }

    // Age rating filter
    let matchesAge = true;
    if (ageRating !== 'any' && game.ageRating) {
      matchesAge = game.ageRating === ageRating;
    }

    return matchesType && matchesSearch && matchesPlayers && matchesDuration && matchesAge;
  });

  const activeFilterCount = [playerCount, duration, ageRating].filter(f => f !== 'any').length;

  const clearFilters = () => {
    setPlayerCount('any');
    setDuration('any');
    setAgeRating('any');
  };

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
            <Globe size={48} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                World Vault
              </h1>
              <p className="text-black/50 text-lg mt-2">
                {games.length} games from the community
              </p>
            </div>
          </div>
        </header>

        {/* Search + Filter Toggle */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input flex-1 px-6 py-5 text-lg text-black placeholder-black/30"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`glass-button px-6 py-5 text-base font-medium transition-all ${
              showFilters || activeFilterCount > 0 ? 'glass-button-active' : 'text-black/70 hover:text-black'
            }`}
          >
            <Filter size={20} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium uppercase tracking-wider text-black/40">
                Advanced Filters
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-black/50 hover:text-black flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Player Count */}
              <div>
                <label className="block text-sm font-medium text-black/60 mb-3">
                  Player Count
                </label>
                <select
                  value={playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                  className="glass-input w-full px-4 py-3 text-base text-black"
                >
                  {PLAYER_COUNTS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt === 'any' ? 'Any' : `${opt} players`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-black/60 mb-3">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="glass-input w-full px-4 py-3 text-base text-black"
                >
                  {DURATIONS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt === 'any' ? 'Any' : opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Rating */}
              <div>
                <label className="block text-sm font-medium text-black/60 mb-3">
                  Age Rating
                </label>
                <select
                  value={ageRating}
                  onChange={(e) => setAgeRating(e.target.value)}
                  className="glass-input w-full px-4 py-3 text-base text-black"
                >
                  <option value="any">Any</option>
                  {ageRatings.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Game Type Filters */}
        <div className="mb-10">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`glass-button px-6 py-4 capitalize text-base font-medium transition-all ${
                activeFilter === 'all'
                  ? 'glass-button-active'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              All
            </button>
            {gameTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`glass-button px-6 py-4 capitalize text-base font-medium transition-all ${
                  activeFilter === type
                    ? 'glass-button-active'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-black/50 text-base">
          Showing {filteredGames.length} of {games.length} games
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-16 text-center text-black/40 text-lg">
            No games found
          </div>
        )}
      </div>
    </div>
  );
}
