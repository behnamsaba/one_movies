import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import Link from 'next/link';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';
import Pagination from '@/components/Pagination';
import SortBar from '@/components/SortBar';
import FilterBar from '@/components/FilterBar';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import externalApi from '@/api/externalApi';

const Movies = ({ initialMovies, page, totalPages }) => {
    const router = useRouter();
    const [sort, setSort] = useState('popularity.desc');
    const [filters, setFilters] = useState({ genres: [], minRating: 0 });
    const [filteredItems, setFilteredItems] = useState(null);
    const [loading, setLoading] = useState(false);

    const baseItems = filteredItems ?? initialMovies ?? [];
    const items = useMemo(() => {
        const arr = [...baseItems];
        switch (sort) {
            case 'vote_average.desc':
                return arr.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
            case 'date.desc':
                return arr.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
            case 'title.asc':
                return arr.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            default:
                return arr.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }
    }, [baseItems, sort]);

    const hasActiveFilters = (filters.genres?.length || 0) > 0 || (filters.minRating || 0) > 0;

    // Fetch discover results when filters change
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!hasActiveFilters) { setFilteredItems(null); return; }
            setLoading(true);
            try {
                const with_genres = filters.genres?.join(',');
                const min_rating = filters.minRating || undefined;
                const res = await externalApi.discoverMovies({ page: 1, with_genres, min_rating });
                if (!mounted) return;
                setFilteredItems(res.results || []);
            } catch (e) {
                if (!mounted) return;
                setFilteredItems([]);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [filters]);

    if (router.isFallback) {
        return (
            <Format>
                <div className='px-6 py-12 text-center text-white'>Loading…</div>
            </Format>
        );
    }

    const makeHref = (p) => `/movies/${p}`;
    const current = parseInt(page) || 1;

    return (
        <Format>
            <header className='px-6 pt-8'>
                <h1 className='text-3xl font-bold text-white'>Movies</h1>
                <p className='text-zinc-200 mt-1'>Discover what&apos;s popular now, updated frequently.</p>
            </header>
            <SortBar value={sort} onChange={setSort} />
            <FilterBar type='movie' value={filters} onChange={setFilters} />

            {loading ? (
                <div className='px-6 py-8 text-white'>Loading results…</div>
            ) : (
                <Content title='Latest Movies' items={items} Component={MediaList} />
            )}

            {!hasActiveFilters && (
                <Pagination current={current} total={totalPages} makeHref={makeHref} />
            )}
        </Format>
    );
};

export async function getStaticProps({ params }) {
    const page = params.page;
    const response = await movieDbApi.getMovies(page);
    return {
        props: {
            initialMovies: response.results,
            totalPages: response.total_pages || null,
            page,
        },
        revalidate: 1800, // Revalidate list every 30 minutes
    };
}

export async function getStaticPaths() {
    // pre-render first 3 pages, block others on first request
    const pageCount = 3;
    const paths = Array.from({ length: pageCount }, (_, i) => ({ params: { page: (i + 1).toString() } }));
    return { paths, fallback: 'blocking' };
}

export default Movies;
