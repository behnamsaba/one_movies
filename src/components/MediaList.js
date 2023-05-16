import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const MediaList = ({
    id,
    name,
    title,
    date,
    poster_path,
    vote_average,
    original_language,
    overview,
}) => {
    const [showOverview, setOverview] = useState(false);

    const handleMouseToggle = () => setOverview(prev => !prev);

    const isMovie = Boolean(title);
    const linkPath = isMovie ? 'movie' : 'show';
    const altText = isMovie ? title : name;

    const imageComponent = poster_path && (
        <Link href={`/${linkPath}/${id}`}>
            <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt={altText}
                width={200}
                height={200}
                onMouseEnter={handleMouseToggle}
                onMouseLeave={handleMouseToggle}
            />
        </Link>
    );

    return (
        <div className='Item'>
            {imageComponent}
            <ul>
                <li>{altText}</li>
                <li>{date}</li>
                <li>{vote_average}</li>
                <li>{original_language}</li>
                {showOverview && <li><p>{overview}</p></li>}
            </ul>
        </div>
    );
};

export default MediaList;
