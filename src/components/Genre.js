import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './Loading';

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
        <div
            onMouseLeave={handleMouseOut}
            className='list-container'>
            <button onMouseOver={handleMouseOver}>
                Hover me to see the list
            </button>
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
