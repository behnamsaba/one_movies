import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './Loading';
import Link from 'next/link';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

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
    // items-center-w[340px] h-[340px]
    return (
        <div
            className='relative'>
            <a onMouseOver={handleMouseOver}>
                Genres{' '}
                {showList ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
            </a>

            {showList && (
                <ul onMouseLeave={handleMouseOut} className='absolute top-full mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
                    {data.genres.map((item) => (
                        <li key={item.id} className='p-1 hover:bg-gray-200 cursor-pointer text-black py-2'>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Genre;