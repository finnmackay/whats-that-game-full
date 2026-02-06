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
      <div className="bg-[var(--color-card)] rounded-3xl px-5 py-8 cursor-pointer hover:bg-[var(--color-card-hover)] hover:-translate-y-2 hover:shadow-xl transition-all shadow-md aspect-[2.5/3.5] flex flex-col border border-black/5">
        {/* Name at top */}
        <h2 className="text-base font-bold text-black text-center leading-snug mb-4">{game.name}</h2>

        {/* Emoji - centered */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-7xl">{game.emoji}</span>
        </div>

        {/* Blurb under emoji */}
        <p className="text-xs text-black/50 text-center line-clamp-2 mt-4 mb-5 leading-relaxed">{game.description}</p>

        {/* Upvote pill */}
        <div className="flex justify-center">
          <button
            onClick={handleUpvote}
            className={`px-5 py-2.5 rounded-full transition-all text-sm font-semibold flex items-center gap-2 ${
              hasUpvoted
                ? 'bg-[var(--color-primary)] text-white shadow-md'
                : 'bg-black/5 text-black/60 hover:bg-black/10 hover:text-black'
            }`}
          >
            <ArrowUp size={14} />
            <span>{voteCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
