import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './Loading';
import Link from 'next/link';

const Genre = () => {
    const data = useSelector((data) => data.externalApiDataSlice);

    const [showList, setShowList] = useState(false);

    function handleMouseOver() {
        setShowList(true);
    }

    function handleMouseOut() {
        setShowList(false);
    }

    if (!data || data.status === 'loading') {
        return <LoadingSpinner />;
    }
    return (
        <div className='relative'>
            <a onMouseOver={handleMouseOver}>Genres</a>

            {showList && (
                <ul
                    onMouseLeave={handleMouseOut}
                    className='absolute z-10 top-full mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-48'>
                    {data.genresList.map((item) => (
                        <li
                            key={item.id}
                            className='p-1 hover:bg-gray-200 cursor-pointer text-black py-2'>
                            <Link
                                href={`/genre/${item.name}/${item.id}/1`}
                                className='w-full inline-block on-hover'>
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
