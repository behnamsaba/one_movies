import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import { GrLanguage } from 'react-icons/gr';

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
    const [showOverview, setShowOverview] = useState(false);

    const handleMouseOver = () => setShowOverview(true);
    const handleMouseOut = () => setShowOverview(false);

    const isMovie = Boolean(title);
    const linkPath = isMovie ? 'movie' : 'show';
    const altText = isMovie ? title : name;

    const imageComponent = poster_path && (
        <Link href={`/${linkPath}/${id}`}>
            <Image
                src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                alt={altText}
                width={200}
                height={300}
                sizes="(max-width: 640px) 45vw, 200px"
                quality={75}
            />
        </Link>
    );

    return (
        <div
            className='card relative'
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}>
            {imageComponent}
            <div className='px-6 pt-4 pb-2'>
                <div className='font-bold text-xl mb-2'>{altText}</div>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    {release_date || first_air_date}
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    <AiOutlineStar className='inline-block mr-1' />
                    {vote_average}
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    <GrLanguage className='inline-block mr-1' />
                    {original_language ? original_language.toUpperCase() : ''}
                </span>
            </div>
            {showOverview && (
                <div className='absolute bottom-0 left-0 right-0 bg-white text-black p-2'>
                    {overview}
                </div>
            )}
        </div>
    );
};

export default MediaList;
