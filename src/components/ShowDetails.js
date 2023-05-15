import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ShowDetails = ({
    id,
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
    spoken_languages,
    homepage,
    production_countries,
}) => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.back()}>Back</button>
            <h1>{name}</h1>
            <ul>
                <li>
                    <Image
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt={name}
                        width={200}
                        height={200}
                    />
                </li>
                <li>
                    <p>{overview}</p>
                </li>
                <li>{status}</li>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
                <li>{first_air_date}</li>
                <li>{origin_country}</li>
                <li>{homepage}</li>
                {production_countries.map((country) => (
                    <li key={id}>{country.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShowDetails;
