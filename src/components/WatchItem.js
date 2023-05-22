import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { delItem } from '@/store/actionCreators';

const WatchItem = ({
    id,
    category,
    title,
    poster_path,
    rating,
    release_date,
}) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((data) => data.internalDataSlice.user);

    const deleteHandler = async () => {
        try {
            await dispatch(
                delItem({ username: userInfo.username, id })
            ).unwrap();
            console.log('clicked');
        } catch (error) {
            console.log('state', error);
        }
    };

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
                <button onClick={deleteHandler}>X</button>
            </ul>
        </div>
    );
};

export default WatchItem;
