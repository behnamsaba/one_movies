import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineStar } from 'react-icons/ai';

const ShowDetails = ({
    name,
    first_air_date,
    networks,
    origin_country,
    number_of_episodes,
    number_of_seasons,
    original_language,
    poster_path,
    overview,
    status,
    vote_average,
    genres,
    homepage,
    production_countries,
}) => {
    const router = useRouter();
    return (
        <div className='flex flex-col md:flex-row bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden m-4'>
            <div className='flex-shrink-0'>
                <Image
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={name}
                    width={400}
                    height={600}
                    className='h-full w-full object-cover'
                />
            </div>
            <div className='p-8'>
                <button
                    onClick={() => router.back()}
                    className='mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Back
                </button>
                <h1 className='text-4xl mb-2 leading-tight font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl'>
                    {name}
                </h1>
                <p className='text-xl font-medium mb-4 text-gray-300'>
                    {overview}
                </p>
                <p className='font-bold mb-2 text-gray-400'>Status: {status}</p>
                <div className='font-bold mb-2 text-gray-400'>Genres:</div>
                <div className='flex flex-wrap gap-2'>
                    {genres.map((genre, id) => (
                        <span
                            key={genre.id}
                            className='inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 bg-gray-800'>
                            {genre.name}
                        </span>
                    ))}
                </div>
                <p className='font-bold mb-2 text-gray-400'>
                    First Air Date: {first_air_date}
                </p>
                <p className='font-bold mb-2 text-gray-400'>
                    Origin Country: {origin_country}
                </p>
                <div className='font-bold mb-2 text-gray-400'>Networks:</div>
                <div className='flex flex-wrap gap-2'>
                    {networks.map((network, id) => (
                        <Link
                            key={id}
                            href={homepage ? homepage :`https://www.google.com/search?q=${name}`}
                            className='mb-2'>
                            <Image
                                src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                                alt={network.name}
                                width={50}
                                height={50}
                                className='rounded-full'
                            />
                        </Link>
                    ))}
                </div>
                <p className='font-bold mb-2 text-gray-400'>
                    Total Episodes: {number_of_episodes}
                </p>
                <p className='font-bold mb-2 text-gray-400'>
                    Number of Seasons: {number_of_seasons}
                </p>
                <p className='font-bold mb-2 text-gray-400'>
                    Original Language: {original_language}
                </p>
                <div className='flex items-center'>
                    <AiOutlineStar className='text-yellow-500' />
                    <p className='font-bold ml-2 text-gray-400'>
                        {vote_average}
                    </p>
                </div>
                <div className='font-bold mb-2 text-gray-400'>
                    Production Countries:
                </div>
                {production_countries.map((country, id) => (
                    <p
                        key={id}
                        className='mb-2 text-gray-300'>
                        {country.name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ShowDetails;
