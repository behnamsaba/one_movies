import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ListItem = ({ children }) => <li>{children}</li>;

const ImageItem = ({ src, alt, width = 200, height = 200 }) => (
    <ListItem>
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    </ListItem>
);

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
    homepage,
    production_countries,
}) => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.back()}>Back</button>
            <h1>{name}</h1>
            <ul>
                <ImageItem
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={name}
                />
                <ListItem>
                    <p>{overview}</p>
                </ListItem>
                <ListItem>{status}</ListItem>
                <ListItem>Genres:</ListItem>
                {genres.map((genre) => (
                    <ListItem key={genre.id}>{genre.name}</ListItem>
                ))}
                <ListItem>{first_air_date}</ListItem>
                <ListItem>{origin_country}</ListItem>
                <ListItem>Networks:</ListItem>
                {networks.map((network) => (
                    <ListItem key={network.id}>
                        <Link href={homepage}>
                            <ImageItem
                                src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                                alt={network.name}
                                width={50}
                                height={50}
                            />
                        </Link>
                    </ListItem>
                ))}
                <ListItem>Total Episodes: {number_of_episodes}</ListItem>
                <ListItem>Number of Seasons: {number_of_seasons}</ListItem>
                <ListItem>Original language: {original_language}</ListItem>
                <ListItem>Vote: {vote_average}</ListItem>
                {production_countries.map((country) => (
                    <ListItem key={id}>{country.name}</ListItem>
                ))}
            </ul>
        </div>
    );
};

export default ShowDetails;
