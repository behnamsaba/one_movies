import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './Loading';
import Link from 'next/link';

const Genre = () => {
    const data = useSelector((data) => data.externalApiDataSlice.genresList);

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
        <div onMouseLeave={handleMouseOut} className="w-64 h-32 transition-transform duration-100 transform hover:scale-110">
            <Link
                href='/genre'
                onMouseOver={handleMouseOver}>
                Genre
            </Link>
            {showList && (
                <ul className='list'>
                    {data.genres.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Genre;
