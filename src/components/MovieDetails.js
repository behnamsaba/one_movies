import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
}) => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.back()}>Back</button>
            <h1>{original_title}</h1>
            <ul>
                <li>
                    <Image
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt={original_title}
                        width={200}
                        height={200}
                    />
                </li>
                <li>
                    <p>{overview}</p>
                </li>
                <li>{budget}</li>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
                <li>{release_date}</li>
                <li>{runtime}</li>
                <li>{revenue}</li>
                {production_countries.map((country) => (
                    <li key={id}>{country.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieDetails;
