import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai';
import { BiHeartSquare } from 'react-icons/bi';

import Genre from './Genre';
import SearchForm from './SearchForm';
import LogOut from './LogOut';

function UserSection({ user }) {
  return (
    <>
      {user ? (
        <div className='inline-flex gap-6'>
          <Link href='/user/profile'>
            <ul className='text-center'>
              <li>{user.username}</li>
              <li><BiHeartSquare color='red' /></li>
              <li>{user.watchlist.length}</li>
            </ul>
          </Link>
          <LogOut />
        </div>
      ) : (
        <ul>
          <Link href='/login'>
          <li>login</li>
          <li><AiOutlineLogin /></li>
          </Link>
        </ul>

      )}
    </>
  );
}

function Navbar() {
  const { user } = useSelector(state => state.internalDataSlice);

  return (
    <nav>
      <div className='xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3 px-5'>
        <div className='md:flex-none w-96 order-2 sm:order-1 flex justify-center py- sm:py-0'>
          <SearchForm />
        </div>
        <div className='font-bold uppercase text-2xl'>
          <Link href='/'>
            <ul>
              <li><AiFillHome/></li>
              <li>ONEMOVIES</li>
            </ul>
          </Link>
        </div>
        <div className='flex gap-6'>
          <Link href='/top-imdb/1'>Top IMDb</Link>
          <Link href='/tv-series/1'>TV-Series</Link>
          <Link href='/movies/1'>Movies</Link>
          <Genre />
        </div>
        <UserSection user={user} />
      </div>
    </nav>
  );
}

export default Navbar;
