import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Check, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

export default function AddGame() {
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [loadingMetadata, setLoadingMetadata] = useState(true);

  // Fetch metadata on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await api.getGameMetadata();
        setMetadata(data);
      } catch (err) {
        console.error('Failed to fetch metadata:', err);
        // Fallback defaults
        setMetadata({
          game_types: ['card', 'dice', 'board', 'party', 'strategy', 'drinking'],
          age_ratings: ['12+', '18+'],
          equipment: ['Standard deck of cards', 'Dice', 'Pen and paper', 'Nothing needed'],
          themes: ['Social', 'Strategy', 'Bluffing', 'Memory', 'Speed']
        });
      } finally {
        setLoadingMetadata(false);
      }
    };
    fetchMetadata();
  }, []);

  const DURATION_OPTIONS = [
    '5 min',
    '10 min',
    '15 min',
    '20 min',
    '30 min',
    '45 min',
    '1 hour',
    '1-2 hours',
    '2+ hours'
  ];

  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: '',
    ageRating: '12+',
    gameType: 'party',
    minPlayers: 2,
    maxPlayers: 8,
    duration: '15 min',
    equipment: [],
    themes: [],
    setup: '',
    gameplay: '',
    objective: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    // Validation
    if (formData.equipment.length === 0) {
      setError('Please select at least one equipment option');
      return;
    }
    if (formData.themes.length === 0) {
      setError('Please select at least one theme');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Combine rules sections
      const combinedRules = `**Setup:**\n${formData.setup}\n\n**Gameplay:**\n${formData.gameplay}\n\n**Objective:**\n${formData.objective}`;

      // Transform form data to API format
      const gameData = {
        name: formData.name,
        description: formData.description,
        age_rating: formData.ageRating,
        game_type: formData.gameType,
        player_count: {
          min_players: parseInt(formData.minPlayers),
          max_players: parseInt(formData.maxPlayers)
        },
        duration: formData.duration,
        equipment: formData.equipment.map(e => ({ equipment_name: e })),
        themes: formData.themes.map(t => ({ theme_name: t })),
        rules: combinedRules,
        image_url: formData.emoji,
        is_public: true
      };

      await api.createGame(gameData);
      navigate('/world-vault');
    } catch (err) {
      setError(err.message || 'Failed to create game');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleEquipment = (item) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter(e => e !== item)
        : [...prev.equipment, item]
    }));
  };

  const toggleTheme = (theme) => {
    setFormData(prev => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter(t => t !== theme)
        : [...prev.themes, theme]
    }));
  };

  if (loadingMetadata) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader size={32} className="animate-spin text-black/30" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <Link to="/" className="glass-button px-5 py-3 text-black/60 hover:text-black transition-colors text-base">
            <X size={18} />
            <span>Cancel</span>
          </Link>
          <h1 className="text-2xl font-semibold text-black">
            Add Game
          </h1>
          <div className="w-24"></div>
        </header>

        <div className="glass-card p-10 md:p-12">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          {!isLoggedIn && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 mb-6 text-sm">
              You need to sign in to add a game.{' '}
              <button onClick={openLoginModal} className="underline">Sign in</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Emoji */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Emoji Icon *
              </label>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                placeholder="🎲"
                required
                className="glass-input w-full px-6 py-6 text-4xl text-center text-black placeholder-black/20"
                maxLength={2}
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Game Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter game name"
                required
                className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Short Description *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A quick description of the game"
                required
                className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30"
              />
            </div>

            {/* Game Type & Age Rating */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Game Type *
                </label>
                <select
                  name="gameType"
                  value={formData.gameType}
                  onChange={handleChange}
                  required
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                >
                  {(metadata?.game_types || []).map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Age Rating *
                </label>
                <select
                  name="ageRating"
                  value={formData.ageRating}
                  onChange={handleChange}
                  required
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                >
                  {(metadata?.age_ratings || ['12+', '18+']).map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Player Count */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Min Players *
                </label>
                <input
                  type="number"
                  name="minPlayers"
                  value={formData.minPlayers}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  required
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Max Players *
                </label>
                <input
                  type="number"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  required
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Duration *
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="glass-input w-full px-6 py-5 text-lg text-black"
              >
                {DURATION_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Equipment Needed *
              </label>
              <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto p-2">
                {(metadata?.equipment || []).map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleEquipment(item)}
                    className={`glass-button px-4 py-3 text-base transition-all ${
                      formData.equipment.includes(item)
                        ? 'glass-button-active'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Themes / Tags *
              </label>
              <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto p-2">
                {(metadata?.themes || []).map(theme => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => toggleTheme(theme)}
                    className={`glass-button px-4 py-3 text-base transition-all ${
                      formData.themes.includes(theme)
                        ? 'glass-button-active'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Rules Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-black border-b border-black/10 pb-3">
                Game Rules
              </h3>

              {/* Setup */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Setup *
                </label>
                <textarea
                  name="setup"
                  value={formData.setup}
                  onChange={handleChange}
                  placeholder="How to set up the game (deal cards, arrange pieces, etc.)"
                  required
                  rows={4}
                  className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30 resize-none leading-relaxed"
                />
              </div>

              {/* Gameplay */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Gameplay *
                </label>
                <textarea
                  name="gameplay"
                  value={formData.gameplay}
                  onChange={handleChange}
                  placeholder="How to play - describe turns, actions, and mechanics"
                  required
                  rows={6}
                  className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30 resize-none leading-relaxed"
                />
              </div>

              {/* Objective */}
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Objective *
                </label>
                <textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="How to win the game"
                  required
                  rows={3}
                  className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30 resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full glass-button glass-button-active py-5 text-xl font-semibold transition-all hover:opacity-90 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Check size={22} />
                  <span>Submit Game</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
