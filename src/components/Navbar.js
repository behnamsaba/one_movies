import Link from 'next/link';
import Genre from './Genre';
import SearchForm from './SearchForm';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const proileData = useSelector((data) => data.internalDataSlice.user);
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    < Genre />
                </li>
                <li>
                    <Link href='/top-rated'>Top IMDb</Link>
                </li>
                <li>
                    <Link href='/tv-series/1'>TV-Series</Link>
                </li>
                <li>
                    <Link href='/movies/1'>Movies</Link>
                </li>
                <li>
                    <Link href='/top-rated'>Top IMDb</Link>
                </li>
                <li>
                    <Link href='/login'>Login/Register</Link>
                </li>
                <li>
                    <SearchForm />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
