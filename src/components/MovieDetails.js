import Image from 'next/image';
import { useRouter } from 'next/router';
import { numberWithCommas } from '@/handlers/numberWithCommas';
const MovieDetails = ({
    id,
    original_title,
    overview,
    budget,
    genres,
    release_date,
    runtime,
    revenue,
    poster_path,
    production_countries,
    trailerKey,
    onWatchTrailer,
}) => {
    const router = useRouter();
    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden m-4">
            <div className="flex-shrink-0">
                <Image
                    src={`https://image.tmdb.org/t/p/w780${poster_path}`}
                    alt={original_title}
                    width={400}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="p-8">
                <button 
                    onClick={() => router.back()}
                    className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
                {trailerKey && (
                    <button
                        onClick={onWatchTrailer}
                        className="ml-3 mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Watch Trailer
                    </button>
                )}
                <h1 className="text-4xl mb-2 leading-tight font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">{original_title}</h1>
                <p className="text-xl font-medium mb-4 text-gray-300">{overview}</p>
                <p className="font-bold mb-2 text-gray-400">Budget: {numberWithCommas(budget)} $</p>
                <div className="font-bold mb-2 text-gray-400">Genres:</div>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre,id) => (
                        <span key={id} className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 bg-gray-800">{genre.name}</span>
                    ))}
                </div>
                <p className="font-bold mb-2 text-gray-400">Release Date: {release_date}</p>
                <p className="font-bold mb-2 text-gray-400">Duration: {runtime}</p>
                <p className="font-bold mb-2 text-gray-400">Revenue: {numberWithCommas(revenue)} $</p>
                <div className="font-bold mb-2 text-gray-400">Production Countries:</div>
                {production_countries.map((country,id) => (
                    <p key={id} className="mb-2 text-gray-300">{country.name}</p>
                ))}
            </div>
        </div>
    );
};

export default MovieDetails;
