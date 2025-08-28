import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { delItem } from '@/store/actionCreators';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

const WatchItem = ({
    id,
    category,
    title,
    poster_path,
    rating,
    release_date,
}) => {
    const userInfo = useSelector((data) => data.internalDataSlice.user);
    const dispatch = useDispatch();
    const deleteHandler = async () => {
        try {
            await dispatch(
                delItem({ username: userInfo.username, apiId: id })
            ).unwrap();
        } catch (e) {}
    };
    return (
        <div className='bg-white shadow overflow-hidden sm:rounded-lg mb-4 max-w-sm'>
            <ul className='border-t border-gray-200 divide-y divide-gray-200'>
                <li className='p-4'>
                    <Link href={`/${category}/${id}`}>
                        <Image
                            className='object-cover'
                            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                            alt={title}
                            width={200}
                            height={300}
                            sizes="(max-width: 640px) 80vw, 200px"
                            quality={75}
                        />
                    </Link>
                </li>
                <li className='p-2'>
                    TYPE | {category}
                </li>
                <li className='p-2'>
                    Name | {title}
                </li>
                <li className='p-2'>
                    <AiOutlineStar className='inline-block mr-1' />
                    {rating}
                </li>
                <li className='p-2'>
                    {release_date}
                </li>
                <li className='p-2 flex justify-end'>
                    <AiOutlineDelete onClick={() => deleteHandler()} size={20} color='red'/>
                </li>
            </ul>
        </div>
    );
};

export default WatchItem;
