import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const SeriesList = ({
    id,
    name,
    first_air_date,
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
            <Link href={`/show/${id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={name}
                    width={200}
                    height={200}
                    onMouseLeave={handleMouseOut}
                    onMouseOver={handleMouseOver}
                />
            </Link>
            <ul>
                <li>{name}</li>
                <li>{first_air_date}</li>
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

export default SeriesList;
