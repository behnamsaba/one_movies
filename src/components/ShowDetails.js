import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
        <div>
            <button onClick={() => router.back()}>Back</button>
            <h1>{name}</h1>
            <ul>
                <Image
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={name}
                    width={200}
                    height={200}
                />
                <li>
                    <p>{overview}</p>
                </li>
                <li>{status}</li>
                <li>Genres:</li>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
                <li>{first_air_date}</li>
                <li>{origin_country}</li>
                <li>Networks:</li>
                {networks.map((network, id) => (
                    <li key={id}>
                        <Link href={homepage}>
                            <Image
                                src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                                alt={network.name}
                                width={50}
                                height={50}
                            />
                        </Link>
                    </li>
                ))}
                <li>Total Episodes: {number_of_episodes}</li>
                <li>Number of Seasons: {number_of_seasons}</li>
                <li>Original language: {original_language}</li>
                <li>Vote: {vote_average}</li>
                {production_countries.map((country, id) => (
                    <li key={id}>{country.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShowDetails;
