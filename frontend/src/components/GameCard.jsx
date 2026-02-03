import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { ArrowUp } from 'lucide-react';

export default function GameCard({ game }) {
  const { upvotes, userUpvotes, toggleUpvote } = useGames();

  const voteCount = upvotes[game.id];
  const hasUpvoted = userUpvotes[game.id];

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleUpvote(game.id);
  };

  return (
    <Link to={`/game/${game.id}`}>
      <div className="glass-card p-5 cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-3">
          <div className="text-4xl">{game.emoji}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-black">{game.name}</h2>
            <p className="text-black/50 text-sm mt-1 line-clamp-2">{game.description}</p>
          </div>
          <button
            onClick={handleUpvote}
            className={`px-3 py-1.5 transition-all text-sm flex items-center gap-1 shrink-0 ${
              hasUpvoted
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-card-hover)] text-black/50 hover:text-black'
            }`}
          >
            <ArrowUp size={14} />
            <span>{voteCount}</span>
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
          <span className="bg-[var(--color-card-hover)] px-2 py-1 text-black/60">{game.playerCount.min}-{game.playerCount.max} players</span>
          <span className="bg-[var(--color-card-hover)] px-2 py-1 text-black/60">{game.duration}</span>
          <span className="bg-[var(--color-card-hover)] px-2 py-1 text-black/60">{game.ageRating}</span>
          <span className="bg-[var(--color-card-hover)] px-2 py-1 text-black/60 capitalize">{game.gameType}</span>
        </div>

        {/* Themes */}
        {game.themes && game.themes.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-black/40">
            {game.themes.slice(0, 4).map((theme, i) => (
              <span key={i}>#{theme}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
