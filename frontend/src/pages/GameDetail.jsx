import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Star, ArrowUp, Flag, X, Share2, Check } from 'lucide-react';
import * as api from '../services/api';

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { games, savedGameIds, toggleSaved, upvotes, userUpvotes, toggleUpvote } = useGames();
  const { isLoggedIn, openLoginModal } = useAuth();

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportError, setReportError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out "${game.name}" on What's That Game!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: game.name, text, url });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

  const handleReport = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    if (!reportReason.trim()) {
      setReportError('Please provide a reason');
      return;
    }

    try {
      await api.reportGame(game.id, reportReason);
      setReportSubmitted(true);
      setTimeout(() => {
        setShowReportModal(false);
        setReportSubmitted(false);
        setReportReason('');
      }, 2000);
    } catch (err) {
      setReportError('Failed to submit report');
    }
  };

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
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="glass-button px-4 py-3 text-black/40 hover:text-black transition-colors"
              title="Share this game"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="glass-button px-4 py-3 text-black/40 hover:text-red-500 transition-colors"
              title="Report this game"
            >
              <Flag size={18} />
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
          </div>
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
          {game.equipment && game.equipment.length > 0 && (
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
          )}

          {/* Rules */}
          <div className="mb-10">
            <h2 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-5">
              How to play
            </h2>
            <div className="text-black/70 leading-relaxed text-lg whitespace-pre-line prose prose-lg">
              {game.rules}
            </div>
          </div>

          {/* Themes */}
          {game.themes && game.themes.length > 0 && (
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
          )}

          {/* Contributor & Upvote */}
          <div className="pt-8 border-t border-black/5 flex items-center justify-between">
            <div className="text-base text-black/40">
              Added by <span className="text-black/60 font-medium">{game.contributor?.name || 'Anonymous'}</span>
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

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowReportModal(false)}
          />
          <div className="glass-card p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-black/40 hover:text-black"
            >
              <X size={24} />
            </button>

            {reportSubmitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-black">Report Submitted</h3>
                <p className="text-black/50 mt-2">Thank you for helping keep the community safe</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-black mb-2">Report Game</h3>
                <p className="text-black/50 mb-6">Why are you reporting "{game.name}"?</p>

                {reportError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 mb-4 text-sm">
                    {reportError}
                  </div>
                )}

                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Describe the issue..."
                  rows={4}
                  className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30 resize-none mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 glass-button py-3 text-black/60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReport}
                    className="flex-1 glass-button glass-button-active py-3"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
