import GlobalActions from '@/components/GlobalActions';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Format = ({ children }) => {
    const router = useRouter();
    const [routeLoading, setRouteLoading] = useState(false);
    const internalLoading = useSelector((s) => s.internalDataSlice.status === 'loading');
    const externalLoading = useSelector((s) => s.externalApiDataSlice.status === 'loading');

    useEffect(() => {
        const handleStart = () => setRouteLoading(true);
        const handleDone = () => setRouteLoading(false);
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleDone);
        router.events.on('routeChangeError', handleDone);
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleDone);
            router.events.off('routeChangeError', handleDone);
        };
    }, [router.events]);

    const showLoading = routeLoading || internalLoading || externalLoading;
    return (
        <div className='min-h-screen flex flex-col'>
            <Head>
                <title>One Movies</title>
            </Head>
            <GlobalActions />
            <LoadingOverlay show={showLoading} />
            <Navbar />
            <main className='flex-1 flex flex-col'>{children}</main>
            <Footer />
        </div>
    );
};

export default Format;
