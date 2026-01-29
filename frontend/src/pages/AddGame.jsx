import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

export default function AddGame() {
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const EQUIPMENT_OPTIONS = [
    'Standard deck of cards',
    'Dice',
    'Pen and paper',
    'Timer',
    'Tokens or chips',
    'Cups',
    'Ball',
    'Nothing needed'
  ];

  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: '',
    ageRating: '12+',
    gameType: 'party',
    minPlayers: 2,
    maxPlayers: 8,
    duration: '',
    equipment: [],
    themes: '',
    rules: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setLoading(true);
    setError('');

    try {
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
        duration: formData.duration || 'Varies',
        equipment: formData.equipment.map(e => ({ equipment_name: e })),
        themes: formData.themes
          ? formData.themes.split(',').map(t => ({ theme_name: t.trim() }))
          : [],
        rules: formData.rules,
        image_url: formData.emoji || '🎲',
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
                Emoji Icon
              </label>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                placeholder="🎲"
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
                  Game Type
                </label>
                <select
                  name="gameType"
                  value={formData.gameType}
                  onChange={handleChange}
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                >
                  <option value="card">Card</option>
                  <option value="dice">Dice</option>
                  <option value="board">Board</option>
                  <option value="party">Party</option>
                  <option value="strategy">Strategy</option>
                  <option value="drinking">Drinking</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Age Rating
                </label>
                <select
                  name="ageRating"
                  value={formData.ageRating}
                  onChange={handleChange}
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                >
                  <option value="3+">3+</option>
                  <option value="7+">7+</option>
                  <option value="12+">12+</option>
                  <option value="16+">16+</option>
                  <option value="18+">18+</option>
                </select>
              </div>
            </div>

            {/* Player Count */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Min Players
                </label>
                <input
                  type="number"
                  name="minPlayers"
                  value={formData.minPlayers}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                  Max Players
                </label>
                <input
                  type="number"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="glass-input w-full px-6 py-5 text-lg text-black"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 15-30 min"
                className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30"
              />
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Equipment Needed
              </label>
              <div className="flex flex-wrap gap-3">
                {EQUIPMENT_OPTIONS.map(item => (
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
                Themes / Tags
              </label>
              <input
                type="text"
                name="themes"
                value={formData.themes}
                onChange={handleChange}
                placeholder="Social, Strategy, Bluffing (comma separated)"
                className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30"
              />
            </div>

            {/* Rules */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Rules *
              </label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Explain how to play the game..."
                required
                rows={10}
                className="glass-input w-full px-6 py-5 text-lg text-black placeholder-black/30 resize-none leading-relaxed"
              />
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
