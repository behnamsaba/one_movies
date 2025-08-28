import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineLogin, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BiHeartSquare } from 'react-icons/bi';
import Genre from './Genre';
import SearchForm from './SearchForm';
import LogOut from './LogOut';

const UserSection = ({ user }) => (
    <div className='flex items-center gap-4 px-5'>
        {user ? (
            <>
                <Link href='/user/profile' className='text-center on-hover'>
                    {user.username}
                </Link>
                <div className='flex items-center gap-1'>
                    <BiHeartSquare color='red' size={22} />
                    <p className='text-center'>{user.watchlist?.length ?? 0}</p>
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

const NavbarLink = ({ href, matchPrefix, children }) => {
    const router = useRouter();
    const as = router.asPath || '';
    const active = matchPrefix
        ? as.startsWith(matchPrefix)
        : href === '/'
            ? as === '/'
            : as.startsWith(href);
    const base = 'px-1 pb-1';
    const activeCls = 'text-white border-b-2 border-sky-400';
    const inactiveCls = 'text-zinc-300 on-hover';
    return (
        <Link href={href} className={`${base} ${active ? activeCls : inactiveCls}`} aria-current={active ? 'page' : undefined}>
            {children}
        </Link>
    );
};

const Navbar = () => {
    const { user } = useSelector((state) => state.internalDataSlice);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='bg-gray-800 text-zinc-300 p-4 w-full'>
            <div className='container mx-auto flex flex-wrap justify-between items-center gap-4 sm:gap-6'>
                {/* Logo */}
                <Link href='/' className='block sm:w-auto w-auto'>
                    <Image
                        src='/logo.png'
                        alt='onemovies'
                        width={100}
                        height={50}
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64"
                        className='rounded hidden sm:block'
                    />
                </Link>

                {/* Mobile hamburger */}
                <button
                    className='sm:hidden p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600'
                    aria-label='Toggle menu'
                    aria-controls='primary-navigation'
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>

                {/* Search */}
                <div className='order-last w-full sm:order-none sm:w-auto mt-3 sm:mt-0 sm:ml-2'>
                    <SearchForm />
                </div>

                {/* Links */}
                <div
                    id='primary-navigation'
                    className={`${menuOpen ? 'block' : 'hidden'} w-full sm:w-auto sm:flex items-center sm:ml-auto px-5`}
                >
                    <div className='flex flex-col sm:flex-row flex-nowrap items-center gap-4 bg-gray-800 sm:bg-transparent p-3 sm:p-0 rounded-md'>
                        <Genre />
                        <NavbarLink href='/'>Home</NavbarLink>
                        <NavbarLink href='/top-imdb/1' matchPrefix='/top-imdb'>Top IMDb</NavbarLink>
                        <NavbarLink href='/tv-series/1' matchPrefix='/tv-series'>TV Series</NavbarLink>
                        <NavbarLink href='/movies/1' matchPrefix='/movies'>Movies</NavbarLink>
                    </div>
                    <div className='w-full sm:w-auto mt-3 pt-3 sm:pt-0 sm:mt-0 sm:ml-6 sm:border-0 border-t border-gray-700'>
                        <UserSection user={user} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
