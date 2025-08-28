import { useMemo } from 'react';

const LoadingOverlay = ({ show }) => {
  const style = useMemo(
    () => ({ display: show ? 'flex' : 'none' }),
    [show]
  );

  return (
    <div
      style={style}
      className="fixed inset-0 z-50 items-center justify-center bg-black/40"
      aria-live="polite"
      aria-busy={show}
    >
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-indigo-600 animate-spin" />
        <span className="mt-3 text-white font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;

