import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const MovieList = ({
    id,
    title,
    name,
    release_date,
    poster_path,
    vote_average,
    original_language,
    overview,
}) => {
    const [showOverview, setOverview] = useState(false);
    function handleMouseOver() {
        setOverview(true);
    }

    function handleMouseOut() {
        setOverview(false);
    }

    return (
        <div className='Item'>
            <Link href={`/movie/${id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={title || name}
                    width={200}
                    height={200}
                    onMouseLeave={handleMouseOut}
                    onMouseOver={handleMouseOver}
                />
            </Link>
            <ul>
                <li>{title}</li>
                <li>{release_date}</li>
                <li>{vote_average}</li>
                <li>{original_language}</li>
                {showOverview && (
                    <li>
                        <p>{overview}</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MovieList;
