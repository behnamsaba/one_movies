import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiHeartSquare } from 'react-icons/bi';
import Genre from './Genre';
import SearchForm from './SearchForm';
import LogOut from './LogOut';

const UserSection = ({ user }) => (
    <div className='flex gap-4 px-5 flex-wrap'>
        {user ? (
            <>
                <Link href='/user/profile' className='text-center on-hover'>
                    {user.username}
                </Link>
                <div className='grid grid-rows-2 justify-center'>
                    <BiHeartSquare color='red' size={30} />
                    <p className='text-center'>{user.watchlist.length}</p>
                </div>
                <LogOut className='on-hover' />
            </>
        ) : (
            <Link href='/login' className='on-hover'>
                <AiOutlineLogin className='inline h-5 w-5' />
                Login
            </Link>
        )}
    </div>
);

const NavbarLink = ({ href, children }) => (
    <Link href={href} className='on-hover'>
        {children}
    </Link>
);

const Navbar = () => {
    const { user } = useSelector((state) => state.internalDataSlice);

    return (
        <nav className='bg-gray-800 text-zinc-300 p-4 w-full'>
            <div className='container mx-auto flex flex-wrap justify-between items-center'>
                <Link href='/' className='block sm:w-auto w-full mb-2 sm:mb-0'>
                    <Image
                        src='/logo.png'
                        alt='onemovies'
                        width={100}
                        height={50}
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64"
                        className='rounded hidden sm:block' // Hide on small screens, show on sm screens and above
                    />
                </Link>
                <div className='w-full sm:w-auto mb-2 sm:mb-0'>
                    <SearchForm />
                </div>
                <div className='flex gap-4 px-5 flex-wrap'>
                    <Genre />
                    <NavbarLink href='/'>Home</NavbarLink>
                    <NavbarLink href='/top-imdb/1'>Top IMDb</NavbarLink>
                    <NavbarLink href='/tv-series/1'>TV Series</NavbarLink>
                    <NavbarLink href='/movies/1'>Movies</NavbarLink>
                    <UserSection user={user} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
