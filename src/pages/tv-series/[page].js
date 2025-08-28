import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import Link from 'next/link';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';
import Pagination from '@/components/Pagination';
import SortBar from '@/components/SortBar';
import FilterBar from '@/components/FilterBar';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import externalApi from '@/api/externalApi';

const TvSeries = ({ initialSeries, page, totalPages }) => {
    const router = useRouter();
    const [sort, setSort] = useState('popularity.desc');
    const [filters, setFilters] = useState({ genres: [], minRating: 0 });
    const [filteredItems, setFilteredItems] = useState(null);
    const [loading, setLoading] = useState(false);

    const items = useMemo(() => {
        const base = filteredItems ?? initialSeries ?? [];
        const arr = [...base];
        switch (sort) {
            case 'vote_average.desc':
                return arr.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
            case 'date.desc':
                return arr.sort((a, b) => new Date(b.first_air_date || 0) - new Date(a.first_air_date || 0));
            case 'title.asc':
                return arr.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            default:
                return arr.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }
    }, [filteredItems, initialSeries, sort]);

    const hasActiveFilters = (filters.genres?.length || 0) > 0 || (filters.minRating || 0) > 0;

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!hasActiveFilters) { setFilteredItems(null); return; }
            setLoading(true);
            try {
                const with_genres = filters.genres?.join(',');
                const min_rating = filters.minRating || undefined;
                const res = await externalApi.discoverTv({ page: 1, with_genres, min_rating });
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
    }, [filters, hasActiveFilters]);

    if (router.isFallback) {
        return (
            <Format>
                <div className='px-6 py-12 text-center text-white'>Loading…</div>
            </Format>
        );
    }

    const makeHref = (p) => `/tv-series/${p}`;
    const current = parseInt(page) || 1;

    return (
        <Format>
            <header className='px-6 pt-8'>
                <h1 className='text-3xl font-bold text-white'>TV Series</h1>
                <p className='text-zinc-200 mt-1'>Airing today and trending on TV.</p>
            </header>
            <SortBar value={sort} onChange={setSort} />
            <FilterBar type='tv' value={filters} onChange={setFilters} />

            {loading ? (
                <div className='px-6 py-8 text-white'>Loading results…</div>
            ) : (
                <Content title='Latest TV-Series' items={items} Component={MediaList} />
            )}

            {!hasActiveFilters && (
                <Pagination current={current} total={totalPages} makeHref={makeHref} />
            )}
        </Format>
    );
};

export async function getStaticProps({ params }) {
    const page = params.page;
    const response = await movieDbApi.getLatestSeries(page);
    return {
        props: {
            initialSeries: response.results,
            totalPages: response.total_pages || null,
            page,
        },
        revalidate: 1800, // Revalidate list every 30 minutes
    };
}

export async function getStaticPaths() {
    const pageCount = 3;
    const paths = Array.from({ length: pageCount }, (_, i) => ({ params: { page: (i + 1).toString() } }));
    return { paths, fallback: 'blocking' };
}

export default TvSeries;
