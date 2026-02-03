import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, Globe, ChevronRight, ArrowUp, Plus, Star, LogIn, LogOut, Settings, X, Check, Sparkles } from 'lucide-react';

export default function Home() {
  const { games, savedGames, gameOfTheWeek, upvotes, loading, suggestedGame, lastUpvotedGame } = useGames();
  const { user, isLoggedIn, openLoginModal, logout } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <header className="py-8 mb-12">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowSettings(true)}
              className="glass-button p-2 text-black/40 hover:text-black transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </button>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="glass-button px-4 py-2 text-sm flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>{user?.username}</span>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="glass-button px-4 py-2 text-sm flex items-center gap-2"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black mb-4 font-title">
              What's That Game
            </h1>
            <p className="text-black/50 text-xl">
              Discover games worth playing
            </p>
          </div>
        </header>

        <div className="space-y-10">
          {/* Game of the Week */}
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5 px-1">
              Game of the Week
            </h2>
            {loading ? (
              <div className="glass-card p-10 text-center text-black/40">
                Loading...
              </div>
            ) : gameOfTheWeek ? (
              <Link to={`/game/${gameOfTheWeek.id}`}>
                <div className="glass-card p-10 cursor-pointer">
                  <div className="text-7xl text-center py-8">
                    {gameOfTheWeek.emoji}
                  </div>
                  <h3 className="text-3xl font-semibold text-center text-black mt-4">
                    {gameOfTheWeek.name}
                  </h3>
                  <p className="text-black/50 text-center text-lg mt-3">
                    {gameOfTheWeek.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-8 text-black/30 text-base">
                    <ArrowUp size={18} />
                    <span>{upvotes[gameOfTheWeek.id]} upvotes</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="glass-card p-10 text-center text-black/40">
                No games yet. Be the first to add one!
              </div>
            )}
          </section>

          {/* Suggested For You */}
          {suggestedGame && (
            <section>
              <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5 px-1 flex items-center gap-2">
                <Sparkles size={14} />
                Suggested For You
              </h2>
              <Link to={`/game/${suggestedGame.id}`}>
                <div className="glass-card p-6 flex items-center gap-6 cursor-pointer">
                  <span className="text-4xl">{suggestedGame.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-lg">
                      {suggestedGame.name}
                    </h3>
                    <p className="text-black/40 text-sm mt-1">
                      Because you liked {lastUpvotedGame?.name}
                    </p>
                  </div>
                  <ChevronRight size={24} className="text-black/30" />
                </div>
              </Link>
            </section>
          )}

          {/* Saved Games */}
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5 px-1">
              Saved Games
            </h2>
            {savedGames.length > 0 ? (
              <div className="space-y-6">
                {savedGames.slice(0, 3).map(game => (
                  <Link key={game.id} to={`/game/${game.id}`}>
                    <div className="glass-card p-6 flex items-center gap-6 cursor-pointer">
                      <span className="text-4xl">{game.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-lg">
                          {game.name}
                        </h3>
                        <p className="text-black/40 text-base mt-1">
                          {game.playerCount.min}-{game.playerCount.max} players · {game.duration}
                        </p>
                      </div>
                      <ChevronRight size={24} className="text-black/30" />
                    </div>
                  </Link>
                ))}
                {savedGames.length > 3 && (
                  <Link to="/saved">
                    <div className="text-center text-black/40 text-base py-4 hover:text-black transition-colors">
                      View all {savedGames.length} saved games →
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <div className="glass-card p-10 text-center text-black/40 text-lg">
                No saved games yet
              </div>
            )}
          </section>

          {/* Vaults */}
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5 px-1">
              Vaults
            </h2>
            <div className="space-y-6">
              <Link to="/my-vault">
                <div className="glass-card p-8 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-black text-xl">
                        My Vault
                      </h3>
                      <p className="text-black/40 text-base mt-2">
                        Your personal game collection
                      </p>
                    </div>
                    <Lock size={40} strokeWidth={1.5} className="text-black/70" />
                  </div>
                </div>
              </Link>

              <Link to="/world-vault">
                <div className="glass-card p-8 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-black text-xl">
                        World Vault
                      </h3>
                      <p className="text-black/40 text-base mt-2">
                        Discover community games
                      </p>
                    </div>
                    <Globe size={40} strokeWidth={1.5} className="text-black/70" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Add Game Button */}
          <Link to="/add" className="block mt-12">
            <div className="glass-card p-6 cursor-pointer flex items-center justify-center gap-3">
              <Plus size={22} strokeWidth={2} />
              <span className="text-black font-semibold text-lg">Add a Game</span>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-black/30 text-base mt-20 pb-10">
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
