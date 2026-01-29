import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { ArrowLeft, Star, ArrowUp } from 'lucide-react';

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { games, savedGameIds, toggleSaved, upvotes, userUpvotes, toggleUpvote } = useGames();

  const game = games.find(g => g.id === id);

  if (!game) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <div className="glass-card p-16 text-center">
          <p className="text-black/40 text-lg mb-6">Game not found</p>
          <Link to="/" className="text-black underline text-lg">Go back home</Link>
        </div>
      </div>
    );
  }

  const isSaved = savedGameIds.includes(game.id);
  const hasUpvoted = userUpvotes[game.id];
  const voteCount = upvotes[game.id];

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="glass-button px-5 py-3 text-black/60 hover:text-black transition-colors text-base"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button
            onClick={() => toggleSaved(game.id)}
            className={`glass-button px-6 py-3 transition-all text-base font-medium ${
              isSaved
                ? 'glass-button-active'
                : 'text-black/70 hover:text-black'
            }`}
          >
            <Star size={18} fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </header>

        {/* Main Card */}
        <div className="glass-card p-10 md:p-14">
          {/* Emoji Hero */}
          <div className="text-9xl text-center py-12">
            {game.emoji}
          </div>

          {/* Title & Description */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4">
              {game.name}
            </h1>
            <p className="text-black/50 text-xl">
              {game.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="glass-button p-6 text-center">
              <div className="text-sm font-medium uppercase tracking-wider text-black/40 mb-2">Players</div>
              <div className="text-2xl font-semibold text-black">{game.playerCount.min}-{game.playerCount.max}</div>
            </div>
            <div className="glass-button p-6 text-center">
              <div className="text-sm font-medium uppercase tracking-wider text-black/40 mb-2">Duration</div>
              <div className="text-2xl font-semibold text-black">{game.duration}</div>
            </div>
            <div className="glass-button p-6 text-center">
              <div className="text-sm font-medium uppercase tracking-wider text-black/40 mb-2">Age</div>
              <div className="text-2xl font-semibold text-black">{game.ageRating}</div>
            </div>
          </div>

          {/* Equipment */}
          <div className="mb-10">
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5">
              What you need
            </h2>
            <div className="flex flex-wrap gap-4">
              {game.equipment.map((item, i) => (
                <span
                  key={i}
                  className="glass-button px-5 py-3 text-black/70 text-base"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-10">
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5">
              How to play
            </h2>
            <p className="text-black/70 leading-relaxed text-lg whitespace-pre-line">
              {game.rules}
            </p>
          </div>

          {/* Themes */}
          <div className="mb-10">
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5">
              Themes
            </h2>
            <div className="flex flex-wrap gap-4">
              {game.themes.map((theme, i) => (
                <span
                  key={i}
                  className="text-base text-black/50"
                >
                  #{theme}
                </span>
              ))}
            </div>
          </div>

          {/* Contributor & Upvote */}
          <div className="pt-8 border-t border-black/5 flex items-center justify-between">
            <div className="text-base text-black/40">
              Added by <span className="text-black/60 font-medium">{game.contributor.name}</span>
            </div>
            <button
              onClick={() => toggleUpvote(game.id)}
              className={`glass-button px-8 py-4 transition-all text-lg font-medium ${
                hasUpvoted
                  ? 'glass-button-active'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              <ArrowUp size={22} />
              <span>{voteCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
