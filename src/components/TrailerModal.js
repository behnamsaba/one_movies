import { useEffect } from 'react';

const TrailerModal = ({ open, onClose, youtubeKey }) => {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-md shadow-lg">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Close
        </button>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;

