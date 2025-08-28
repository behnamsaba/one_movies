import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoadingSpinner from './Loading';
import Link from 'next/link';

const Genre = () => {
    const data = useSelector((data) => data.externalApiDataSlice);

    const [open, setOpen] = useState(false);
    const closeTimer = useRef(null);

    const safeOpen = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
    };
    const safeClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpen(false), 180);
    };
    const toggleMenu = () => setOpen((v) => !v);

    if (!data || data.status === 'loading') {
        return <LoadingSpinner />;
    }
    const genres = data?.genresList || [];
    const { asPath } = useRouter();
    const isActive = (asPath || '').startsWith('/genre');
    return (
        <div className='relative' onMouseEnter={safeOpen} onMouseLeave={safeClose}>
            <button
                type='button'
                onClick={toggleMenu}
                aria-haspopup='menu'
                aria-expanded={open}
                className={`px-1 pb-1 ${isActive ? 'text-white border-b-2 border-sky-400' : 'on-hover text-zinc-300'}`}>
                Genres
            </button>

            {open && genres.length > 0 && (
                <ul
                    onMouseEnter={safeOpen}
                    onMouseLeave={safeClose}
                    className='absolute z-50 top-full mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60'>
                    {genres.map((item) => (
                        <li
                            key={item.id}
                            className='p-1 hover:bg-gray-200 cursor-pointer text-black py-2'>
                            <Link
                                href={`/genre/${item.name}/${item.id}/1`}
                                className='w-full inline-block on-hover'
                                onClick={() => setOpen(false)}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Genre;
