import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const MediaList = ({
    id,
    name,
    title,
    release_date,
    first_air_date,
    poster_path,
    vote_average,
    original_language,
    overview,
}) => {
    const [showOverview, setOverview] = useState(false);

    const handleMouseToggle = () => setOverview((prev) => !prev);

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
        <div className='card'>
            {imageComponent}
            <div className='px-6 pt-4 pb-2'>
                <div class='font-bold text-xl mb-2'>{ altText }</div>
                <span className='media-tags'>
                    {release_date || first_air_date}
                </span>
                <span className='media-tags'>
                    {vote_average}
                </span>
                <span className='media-tags'>
                    {original_language}
                </span>
                {showOverview && <p className='media-description'>{overview}</p>}
            </div>
        </div>
    );
};

export default MediaList;
