import Link from 'next/link';
import Genre from './Genre';
import SearchForm from './SearchForm';
import { useSelector } from 'react-redux';
import LogOut from './LogOut';
import {
    AiFillHome,
    AiOutlineLogin,
    BsFillSearchHeartFill,
} from 'react-icons/ai';

const Navbar = () => {
    const profileData = useSelector((data) => data.internalDataSlice);
    return (
        <nav className='bg-gray-200'>
          <div className='xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3 px-5'>
            <div className='md:flex-none w-96 order-2 sm:order-1 flex justify-center py- sm:py-0'>
              <SearchForm />
            </div>
            <div className='font-bold uppercase text-2xl'>
              <Link href='/'><AiFillHome/>ONEMOVIES</Link>
            </div>
            <div className='flex gap-6'>
              <Link href='/top-imdb/1'>Top IMDb</Link>
              <Link href='/tv-series/1'>TV-Series</Link>
              <Link href='/movies/1'>Movies</Link>
              <Genre />
            </div>
            {profileData.user ? (
            <div className='inline-flex gap-4'>
              <Link href='/user/profile'>
                {profileData.user.username}
              </Link>
              <Link href='/user/profile'>
                WATCHLIST {profileData.user.watchlist.length}
              </Link>
              <LogOut />
              </div>
        ) : (
            <Link href='/login'>
              <AiOutlineLogin />
            </Link>
        )}
            </div>

          

        </nav>
    );
};

export default Navbar;