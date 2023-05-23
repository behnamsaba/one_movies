import Link from 'next/link';
import Genre from './Genre';
import SearchForm from './SearchForm';
import { useSelector } from 'react-redux';
import LogOut from './LogOut';
import styles from '../styles/Navbar.module.css';

const NavbarLink = ({ href, children }) => (
    <li className={styles.navItem}>
        <Link href={href}>{children}</Link>
    </li>
);

const Navbar = () => {
    const profileData = useSelector((data) => data.internalDataSlice);
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <NavbarLink href='/'>Home</NavbarLink>
                <li>
                    <Genre />
                </li>
                <NavbarLink href='/top-imdb/1'>Top IMDb</NavbarLink>
                <NavbarLink href='/tv-series/1'>TV-Series</NavbarLink>
                <NavbarLink href='/movies/1'>Movies</NavbarLink>
                <li>
                    <SearchForm />
                </li>
                {profileData.user ? (
                    <>
                        <NavbarLink href='/user/profile'>
                            {profileData.user.username}
                            WATCHLIST:{profileData.user.watchlist.length}
                        </NavbarLink>
                        <li className={styles.nav}>
                            <LogOut />
                        </li>
                    </>
                ) : (
                    <NavbarLink href='/login'>Login/Register</NavbarLink>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
