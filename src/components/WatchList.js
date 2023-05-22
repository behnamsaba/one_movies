import Image from 'next/image';
import Link from 'next/link';
const WatchList = ({
    id,
    category,
    title,
    poster_path,
    rating,
    release_date,
}) => {
    return (
        <div>
            <ul>
                <li>
                    <Link href={`/${category}/${id}`}>
                        <Image
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            alt={title}
                            width={200}
                            height={200}
                        />
                    </Link>
                </li>
                <li>{category}</li>
                <li>{title}</li>
                <li>{rating}</li>
                <li>{release_date}</li>
            </ul>
        </div>
    );
};

export default WatchList;
