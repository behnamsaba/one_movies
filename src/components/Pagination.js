import Link from 'next/link';

const Pagination = ({ current = 1, total = null, makeHref }) => {
  const pageNum = parseInt(current) || 1;
  const hasPrev = pageNum > 1;
  const hasNext = total ? pageNum < total : true;

  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <Link
        href={hasPrev ? makeHref(pageNum - 1) : '#'}
        aria-disabled={!hasPrev}
        className={`px-4 py-2 rounded bg-gray-800 text-white ${
          hasPrev ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Previous
      </Link>
      <span className="px-3 py-2 rounded bg-gray-900 text-zinc-200 border border-gray-700">
        Page {pageNum}
        {total ? ` of ${total}` : ''}
      </span>
      <Link
        href={hasNext ? makeHref(pageNum + 1) : '#'}
        aria-disabled={!hasNext}
        className={`px-4 py-2 rounded bg-gray-800 text-white ${
          hasNext ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;

