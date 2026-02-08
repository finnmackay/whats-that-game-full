import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, Globe, ChevronRight, Plus, LogIn, LogOut, Settings, X, Check, Sparkles, Search } from 'lucide-react';
import GameCard from '../components/GameCard';

export default function Home() {
  const { games, gameOfTheWeek, loading, suggestedGame, lastUpvotedGame } = useGames();
  const { user, isLoggedIn, openLoginModal, logout } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-5 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <header className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"
              title="Settings"
            >
              <Settings size={18} />
            </button>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs flex items-center gap-1.5 text-black/60 hover:text-black bg-black/5 rounded-full"
              >
                <LogOut size={14} />
                <span>{user?.username}</span>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-3 py-1.5 text-xs flex items-center gap-1.5 text-black/60 hover:text-black bg-black/5 rounded-full"
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </button>
            )}
          </div>
          <div className="text-center py-4">
            <h1 className="text-4xl font-bold tracking-tight text-black mb-2 font-title">
              What's That Game
            </h1>
            <p className="text-black/40 text-sm">
              Discover games worth playing
            </p>
          </div>
        </header>

        <div className="space-y-8">
          {/* Game of the Week */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-3">
              Game of the Week
            </h2>
            {loading ? (
              <div className="bg-[var(--color-card)] p-8 text-center text-black/40 rounded-2xl">
                Loading...
              </div>
            ) : gameOfTheWeek ? (
              <div className="flex justify-center">
                <div className="w-52">
                  <GameCard game={gameOfTheWeek} />
                </div>
              </div>
            ) : (
              <div className="bg-[var(--color-card)] p-8 text-center text-black/40 rounded-2xl text-sm">
                No games yet. Be the first to add one!
              </div>
            )}
          </section>

          {/* Suggested For You */}
          {suggestedGame && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-3 flex items-center gap-1.5">
                <Sparkles size={12} />
                Suggested For You
              </h2>
              <Link to={`/game/${suggestedGame.id}`}>
                <div className="bg-[var(--color-card)] hover:bg-[var(--color-card-hover)] p-4 flex items-center gap-4 cursor-pointer rounded-2xl transition-all">
                  <span className="text-3xl">{suggestedGame.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-black text-sm truncate">
                      {suggestedGame.name}
                    </h3>
                    <p className="text-black/40 text-xs mt-0.5 truncate">
                      Because you liked {lastUpvotedGame?.name}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-black/30" />
                </div>
              </Link>
            </section>
          )}

          {/* Vaults */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-4">
              Vaults
            </h2>
            <div className="space-y-4">
              <Link to="/my-vault">
                <div className="bg-[var(--color-card)] hover:bg-[var(--color-card-hover)] p-4 cursor-pointer rounded-2xl transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center">
                    <Lock size={22} strokeWidth={1.5} className="text-black/60" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-sm">My Vault</h3>
                    <p className="text-black/40 text-xs mt-0.5">Your personal collection</p>
                  </div>
                  <ChevronRight size={18} className="text-black/30" />
                </div>
              </Link>
              <Link to="/world-vault">
                <div className="bg-[var(--color-card)] hover:bg-[var(--color-card-hover)] p-4 cursor-pointer rounded-2xl transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center">
                    <Globe size={22} strokeWidth={1.5} className="text-black/60" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-sm">World Vault</h3>
                    <p className="text-black/40 text-xs mt-0.5">Community games</p>
                  </div>
                  <ChevronRight size={18} className="text-black/30" />
                </div>
              </Link>
            </div>
          </section>

          {/* Add Game Button */}
          <Link to="/add" className="block mt-4">
            <div className="bg-[var(--color-primary)] text-white p-5 cursor-pointer flex items-center justify-center gap-3 rounded-2xl hover:opacity-90 transition-all shadow-md">
              <Plus size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">Add a Game</span>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-black/30 text-xs mt-10 pb-6">
          A repository of games worth remembering
        </footer>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          <div className="glass-card p-8 w-full max-w-sm relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-black/40 hover:text-black"
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold text-black mb-6">Settings</h3>

            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-4">
                Color Theme
              </label>
              <div className="space-y-3">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`w-full glass-button p-4 flex items-center justify-between transition-all ${
                      theme === t.id ? 'glass-button-active' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: t.colors[0] }}
                        />
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: t.colors[1] }}
                        />
                      </div>
                      <span>{t.name}</span>
                    </div>
                    {theme === t.id && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
